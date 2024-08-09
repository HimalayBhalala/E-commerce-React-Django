import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { CartContext } from "../../context/CardContext";
import { loadStripe } from "@stripe/stripe-js";
import { CurrencyContext } from "../../context/CurrencyContex";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderConfirm = ({ isAuthenticated }) => {
  const { setCartData } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const isInitialMount = useRef(true);
  const [payment_confirm,setPaymentConfirm] = useState(false);
  const {getCurrency} = useContext(CurrencyContext);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!orderPlaced) {
      if (payment_confirm){
        addOrder();
      }
    }
  }, [isAuthenticated, orderPlaced, navigate,payment_confirm]);

  const addOrder = async () => {
    setIsLoading(true);

    try {
      const customerID = JSON.parse(localStorage.getItem("customer_id"));
      const formData = new FormData();
      formData.append("customer", parseInt(customerID));

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/orders/`,
        formData
      );

      const order_id = response.data.id;
      await addOrderItem(order_id);
      await updateOrderStatus(order_id)
      setOrderPlaced(true);
      setOrderId(order_id);
    } catch (error) {
      console.log("Error adding order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = (order_id) => {
    axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/update-order-status/${order_id}/`)
    .then((response) => {console.log(response)})
  }
  
  const handlePayment = async () => {
    setIsLoading(true);
    localStorage.setItem('order-currency',getCurrency)
    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/add-payment/`,
        {
          amount: calculateTotalAmount(),
          currency: getCurrency,
        }
      );
      
      const { clientSecret } = response.data;
      console.log(response)
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement("cardElement"),
        },
      });
      
      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful!");
        }
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      setIsLoading(false);
      setPaymentConfirm(true)
    }
  };
  
  const calculateTotalAmount = () => {
    console.log("Total:",localStorage.getItem('total_price'))
    const payment = parseInt(Math.floor(localStorage.getItem('total_price')))
    return payment;
  };

  const addOrderItem = async (order_id) => {
    const cartInfo = localStorage.getItem("cartDetail");
    const cartJson = JSON.parse(cartInfo) || [];

    if (cartJson.length > 0) {
      const requests = cartJson.map((cart) => {
        const formData = new FormData();
        formData.append("order", order_id);
        formData.append("product", cart.product.product_id);
        formData.append("quantity", 1);
        if(getCurrency === 'inr'){
          formData.append("price", cart.product.product_price);
        }else{
          formData.append("price", cart.product.product_usd_price);
        }

        return axios.post(
          `${process.env.REACT_APP_API_URL}/ecommerce/orderitems/`,
          formData
        );
      });

      try {
        await Promise.all(requests);
        localStorage.removeItem("cartDetail");
      } catch (error) {
        console.log("Error adding order item:", error);
      }
    }
      setCartData([]);
  };
  

  return (
    <div>
      {localStorage.getItem('total_price')}
      {isLoading ? (
        <p className="text-center">
          <h1>Processing your order...</h1>
        </p>
      ) : (
        <div className="container mt-5">
          {payment_confirm ? (
              <div
                className="form-control"
                style={{
                  backgroundColor: "#82a382",
                  border: "2px solid black",
                }}
              >
                <div
                  className="container mt-3"
                  style={{ color: "#rgb(15 28 4)" }}
                >
                  <h1 className="text-center">
                    <span style={{ color: "darkgreen" }}>
                      <i className=" fa fa-check-circle"></i>
                    </span>
                    Your order has been confirmed.
                  </h1>
                  <p className="text-center">
                    <span className="text-center">
                      <b>Your Order Id : </b>
                      {orderId}
                    </span>
                  </p>
                </div>
              </div>
          ) : (
              <div
              className="form-control"
              style={{
                backgroundColor: "lightyellow",
                border: "2px solid black",
              }}
            >
              <div
                className="container mt-3"
                style={{ color: "#rgb(15 28 4)" }}
              >
                <h1 className="text-center">
                  <span style={{ color: "black" }}>
                  <i className="fa-solid fa-spinner spinner"></i>
                    &nbsp;&nbsp;Your order has been not confirmed if you have not pay, payment of a selected product.
                  </span>
                </h1>
              </div>
            </div>
          )
          }
          {
            (!payment_confirm) ? (
              <div className="row">
                <div className="col-md-6">
                  <div className="form-control mt-5 offset-6">
                    <h5 className="mt-2">Select Payment Option</h5>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label>
                          <input
                            type="radio"
                            name="selectPay"
                            id="stripe"
                          />
                          &nbsp;Stripe
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn mt-3 btn-outline-primary"
                          onClick={handlePayment}
                          style={{ width: "10rem" }}
                        >
                          Pay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ):
            (
              <div className="text-center">
                <div className="btn btn-success mt-5 ms-1"><Link style={{textDecoration:'none',color:'black'}} to='/'>Go to home</Link></div>
                <div className="btn btn-warning text-center mt-5 ms-1"><Link to='/orders' style={{textDecoration:'none',color:'black'}}>Click here for show Order detail</Link></div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(OrderConfirm);
