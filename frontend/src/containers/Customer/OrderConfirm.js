import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { CartContext } from "../../context/CardContext";
import { loadStripe } from "@stripe/stripe-js";
import { CurrencyContext } from "../../context/CurrencyContex";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderConfirm = ({ isAuthenticated }) => {
  const { setCartData } = useContext(CartContext);
  const { getCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const { order_id } = useParams(); // Use the order_id from URL params
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!orderPlaced) {
      addOrder();
    }
  }, [isAuthenticated, orderPlaced, navigate]);

  const addOrder = async () => {
    setIsLoading(true);

    try {
      const customerID = JSON.parse(localStorage.getItem("customer_id"));
      const formData = new FormData();
      formData.append("customer", parseInt(customerID, 10));

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/orders/`,
        formData
      );

      const order_id = response.data.id;
      setOrderId(order_id); // Set order ID
      await addOrderItems(order_id);

      if (paymentConfirm) {
        await updateOrderStatus(order_id);
      }

      setOrderPlaced(true);
    } catch (error) {
      console.error("Error adding order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (order_id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/update-order-status/${order_id}/`, {
        status: 'completed' // Update to completed status
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    localStorage.setItem('order-currency', getCurrency);

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

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements().getElement("cardElement"),
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
        setPaymentConfirm(true);
        await addOrder(); // Ensure order is added after payment is successful
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    const totalPrice = parseFloat(localStorage.getItem('total_price')) || 0;
    return Math.floor(totalPrice * 100);
  };

  const addOrderItems = async (order_id) => {
    const cartInfo = localStorage.getItem("cartDetail");
    const cartJson = JSON.parse(cartInfo) || [];

    if (cartJson.length > 0) {
      const requests = cartJson.map((cart) => {
        const formData = new FormData();
        formData.append("order", order_id);
        formData.append("product", cart.product.product_id);
        formData.append("quantity", 1);
        formData.append("price", getCurrency === 'inr' ? cart.product.product_price : cart.product.product_usd_price);

        return axios.post(
          `${process.env.REACT_APP_API_URL}/ecommerce/orderitems/`,
          formData
        );
      });

      try {
        await Promise.all(requests);
        localStorage.removeItem("cartDetail");
        setCartData([]);
      } catch (error) {
        console.error("Error adding order items:", error);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <p className="text-center">
          <h1>Processing your order...</h1>
        </p>
      ) : (
        <div className="container mt-5">
          {paymentConfirm ? (
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
                    <i className="fa fa-check-circle"></i>
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
                    &nbsp;&nbsp;Your order has not been confirmed. Please complete the payment for your selected product. {orderId}
                  </span>
                </h1>
              </div>
            </div>
          )}
          {!paymentConfirm && (
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
                        onClick={(e) => {
                          e.preventDefault();
                          handlePayment();
                        }}
                        style={{ width: "10rem" }}
                      >
                        Pay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {paymentConfirm && (
            <div className="text-center">
              <div className="btn btn-success mt-5 ms-1">
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Go to home</Link>
              </div>
              <div className="btn btn-warning text-center mt-5 ms-1">
                <Link to='/orders' style={{ textDecoration: 'none', color: 'black' }}>Click here to view Order details</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(OrderConfirm);
