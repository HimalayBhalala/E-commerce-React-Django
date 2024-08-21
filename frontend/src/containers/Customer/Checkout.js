import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CartContext } from '../../context/CardContext';
import { CurrencyContext } from '../../context/CurrencyContex';
import { ThemeContext } from '../../context/ThemeContext';

const Checkout = ({ isAuthenticated }) => {
  const { setCartData, cartData } = useContext(CartContext);
  const { themeMode } = useContext(ThemeContext);
  const { getCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem('cartDetail')) || [];

  const totalPrice = useMemo(() => {
    return cartData.reduce((sum, item) => {
      const price = getCurrency === 'inr' ? item.product.product_price : item.product.product_usd_price;
      return sum + price;
    }, 0).toFixed(2);
  }, [cartData, getCurrency]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.product.product_id !== id);
    localStorage.setItem('cartDetail', JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  const getThemeColor = () => themeMode === "dark" ? "white" : "black";

  return (
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
                    <tr style={{ color: getThemeColor() }}>
                      <th>Sr.No</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((product, index) => (
                      <tr key={product.product.product_id} style={{ color: getThemeColor() }}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={product.product?.product_image} className='img-thumbnail' style={{ width: "60px" }} alt="product" />
                          <p className='mt-2' style={{ marginLeft: "20px" }}>{product.product?.product_title}</p>
                        </td>
                        <td>
                          {getCurrency === 'inr' ? (
                            <p>₹ {product.product?.product_price}</p>
                          ) : (
                            <p>$ {product.product?.product_usd_price}</p>
                          )}
                        </td>
                        <td>
                          <button className='btn btn-warning btn-large' onClick={() => removeFromCart(product.product?.product_id)}>
                            Remove From Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan='2' className="text-center" style={{ color: getThemeColor() }}>
                        Total Price
                      </td>
                      <td>
                        <strong style={{ color: getThemeColor() }}>
                          {getCurrency === 'inr' ? `₹ ${totalPrice}` : `$ ${totalPrice}`}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='3' className="text-center">
                        <Link className='btn btn-secondary' to='/'>Continue Shopping</Link>
                        <Link className='btn btn-success ms-1' to={`/order/confirm/`}>Proceed For Payment</Link>
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
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Checkout);
