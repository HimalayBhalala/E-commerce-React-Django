import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrencyContext } from '../../context/CurrencyContex';
import { ThemeContext } from '../../context/ThemeContext';
import axios from 'axios';

const MakePayment = ({ isAuthenticated }) => {
  const { themeMode } = useContext(ThemeContext);
  const { getCurrency } = useContext(CurrencyContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const { order_id } = useParams();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return orderData.reduce((sum, item) => {
      return sum + (getCurrency === 'inr' ? item.product.price : item.product.usd_price);
    }, 0).toFixed(2);
  }, [orderData, getCurrency]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const fetchOrderData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer/orders/${order_id}/`);
          setOrderData(response.data.data);
        } catch (error) {
          console.log("Error occurred during fetching API", String(error));
        } finally {
          setLoading(false);
        }
      };
      fetchOrderData();
    }
  }, [isAuthenticated, order_id, navigate]);

  const removeFromList = async (product_id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/ecommerce/customer/orders/${order_id}/${product_id}/`);
      setOrderData(prevOrderData => prevOrderData.filter(product => product.product.id !== product_id));
    } catch (error) {
      console.log("Error occurred during fetching API", String(error));
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/update-order-status/${order_id}/`, { payment_status: 'succeeded' });
      setPaymentConfirmed(true);
      navigate(`/order/confirm/${order_id}`);
    } catch (error) {
      console.log("Error confirming payment:", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        {loading && <p>Loading...</p>}
        {orderData.length > 0 ? (
          <>
            <h3 className='mt-3'>Total Products ({orderData.length})</h3>
            <hr />
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr style={{ color: themeMode === "dark" ? "white" : "black" }}>
                        <th>Sr.No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.map((products, index) => (
                        <tr key={index} style={{ color: themeMode === "dark" ? "white" : "black" }}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={`${process.env.REACT_APP_API_URL}/${products.product?.image}`} className='img-thumbnail' style={{ width: "60px" }} alt="product" />
                            <p className='mt-2' style={{ marginLeft: "20px" }}>{products.product?.title}</p>
                          </td>
                          <td>
                            {getCurrency === 'inr' ? (
                              <p>₹ {products.product?.price}</p>
                            ) : (
                              <p>$ {products.product?.usd_price}</p>
                            )}
                          </td>
                          <td>
                            <button className='btn btn-warning btn-large' onClick={() => removeFromList(products.product?.id)}>Remove Item</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan='2' align='center'>
                          <th className='text-center' style={{ color: themeMode === "dark" ? "white" : "black" }}>Total Price</th>
                        </td>
                        <td>
                          {getCurrency === 'inr' ? (
                            <th style={{ color: themeMode === "dark" ? "white" : "black" }}>₹ {totalPrice}</th>
                          ) : (
                            <th style={{ color: themeMode === "dark" ? "white" : "black" }}>$ {totalPrice}</th>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan='3' align='center'>
                          <button className='btn btn-success ms-1' onClick={confirmPayment}>Confirm Payment</button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            {paymentConfirmed && <p>Payment has been confirmed.</p>}
          </>
        ) : (
          <h1 className='text-center'>No items in order.</h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MakePayment);
