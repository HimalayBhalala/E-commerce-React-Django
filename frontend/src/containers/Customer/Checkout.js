import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CartContext } from '../../context/CardContext';
import { CurrencyContext } from '../../context/CurrencyContex';

const Checkout = ({ isAuthenticated }) => {
  const { setCartData } = useContext(CartContext);
  const cart = JSON.parse(localStorage.getItem('cartDetail')) || [];
  const {currency} = useContext(CurrencyContext);
  const { cartData } = useContext(CartContext);
  const navigate = useNavigate();

  
    const totalPrice = () => {
        let sum = 0;
        if (currency === 'inr'){
            cartData.forEach(item => {
            sum += item.product.product_price
            });
        }else{
            cartData.forEach(item => {
                sum += item.product.product_usd_price
            });
        }
        return sum.toFixed(2);
    };


    useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login');
    }else{
      totalPrice();
    }
    }, [isAuthenticated, navigate,totalPrice]);


const removeFromCart = (id) => {
    const filteredData = cart.filter(products => products.product.product_id !== id);
    localStorage.setItem('cartDetail', JSON.stringify(filteredData));
    setCartData(filteredData);
  };

  return (
    <div>
      <div className="container mt-4">
        {cartData.length > 0 ? (
          <>
            <h3 className='mt-3'>Total Products ({cartData.length})</h3>
            <hr />
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.map((products, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={products.product.product_image} className='img-thumbnail' style={{ width: "60px" }} alt="product" />
                            <p className='mt-2' style={{ marginLeft: "20px" }}>{products.product.product_title}</p>
                          </td>
                          <td>
                            {currency === 'inr' ? (
                              <p>₹ {products.product.product_price}</p>
                            ) : (
                              <p>$ {products.product.product_usd_price}</p>
                            )}
                          </td>
                          <td>
                            <button className='btn btn-warning btn-large' onClick={() => removeFromCart(products.product.product_id)}>Remove From Cart</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan='2' align='center'>
                          <th className='text-center'>Total Price</th>
                        </td>
                        <td>
                          {currency === 'inr' ? (
                            <th>₹ {totalPrice()}</th>
                          ) : (
                            <th>$ {totalPrice()}</th>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan='3' align='center'>
                          <Link className='btn btn-secondary' to='/'>Continue Shopping</Link>
                          <Link className='btn btn-success ms-1' to='/order/confirm'>Proceed For Payment</Link>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1 className='text-center'>No items in cart.</h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Checkout);
