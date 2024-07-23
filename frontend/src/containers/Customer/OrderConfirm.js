import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { CartContext } from "../../context/CardContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderConfirm = ({ isAuthenticated }) => {
  const { setCartData } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(0);
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
      formData.append("customer", parseInt(customerID));

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/orders/`,
        formData
      );

      const order_id = response.data.id;
      await addOrderItem(order_id);
      setOrderPlaced(true);
      setOrderId(order_id);
    } catch (error) {
      console.log("Error adding order:", error);
    } finally {
      setIsLoading(false);
    }
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
        formData.append("price", cart.product.product_price);

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

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/create-payment-intent/`,
        {
          amount: calculateTotalAmount(),
          currency: "usd",
        }
      );

      const { clientSecret } = response.data;

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
    }
  };

  const calculateTotalAmount = () => {
    return 1000; // Example amount calculation
  };

  return (
    <div>
      {isLoading ? (
        <p className="text-center">
          <h1>Processing your order...</h1>
        </p>
      ) : (
        <div className="container mt-5">
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
                </span>{" "}
                Your Order has been confirmed.
              </h1>
              <p className="text-center">
                <span className="text-center">
                  <b>Your Order Id : </b>
                  {orderId}
                </span>
              </p>
            </div>
          </div>
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
                      />{" "}
                      Stripe
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(OrderConfirm);
