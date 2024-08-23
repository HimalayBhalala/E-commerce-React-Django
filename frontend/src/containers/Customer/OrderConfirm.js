import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { CartContext } from "../../context/CardContext";
import { loadStripe } from "@stripe/stripe-js";
import { CurrencyContext } from "../../context/CurrencyContex";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderConfirm = ({ isAuthenticated,customer }) => {
  const { setCartData } = useContext(CartContext);
  const { getCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [getTotalProduct,setTotalProduct] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
  const isInitialMount = useRef(true);

  useEffect(() => {

    if(customer){
      const hasDefaultAddress = customer.some((address) => address.default_address === true);
      if(!hasDefaultAddress){
        navigate("/addresses")
      } 
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    if (orderId > 0){
      const GetTotalOrderProduct = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/order/${orderId}/`)
        .then((response) => {
          setTotalProduct(response.data)
        })
        .catch((error) => {
          console.log("Error Occure during fetching an api",String(error))
        })
      }
      GetTotalOrderProduct();
    }

    if(!orderPlaced && !paymentConfirm){
      addOrder()
    }
    
    if (paymentConfirm){
      try {
        axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/update-order-status/${orderId}/`, {
          status: 'succeeded'
        });
      } catch (error) {
        console.error("Error updating order status:", error);
    };
    }
  }, [isAuthenticated,navigate,paymentConfirm,orderPlaced,customer]);

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
      setOrderId(order_id);
      await addOrderItems(order_id);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error adding order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (paymentId, paymentMethod) => {
    setIsLoading(true);
    localStorage.setItem('order-currency', getCurrency);

    try {
      const totalAmount = calculateTotalAmount();
      
      if (totalAmount <= 0) {
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/add-payment/`,
        {
          amount: totalAmount,
          currency: getCurrency,
          paymentMethodId: paymentId,
          paymentMethod: selectedPaymentMethod,
        }
      );

      if (selectedPaymentMethod === 'stripe') {
        const { clientSecret } = response.data;
        const stripe = await stripePromise;
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentId,
        });

        if (result.error) {
          console.error(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful!");
          setPaymentConfirm(true);
        }
      } else if (selectedPaymentMethod === 'paypal') {
        console.log("PayPal payment successful!");
        setPaymentConfirm(true);
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    let totalPrice = 0
    getTotalProduct.map((products) => {
      if (getCurrency === 'inr'){
        totalPrice += products.product?.price
      }else{
        totalPrice += products.product?.usd_price
      }
    })
    {console.log("Total Price is",totalPrice)}
    if (totalPrice <= 0) {
      console.error("Invalid total amount for payment.");
      return 0;
    }
    return Math.floor(totalPrice * 100);
  };

  const addOrderItems = async (orderId) => {
    const cartInfo = localStorage.getItem("cartDetail");
    const cartJson = JSON.parse(cartInfo) || [];

    if (cartJson.length > 0) {
      const requests = cartJson.map((cart) => {
        const formData = new FormData();
        formData.append("order", orderId);
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

  const handlePayPalSuccess = (details, data) => {
    handlePayment(data.orderID, 'paypal');
  };

  return (
    <div>
      {console.log("Customer address is ",customer)}
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
              <div className="text-center mt-4">
                <div className="btn btn-success me-2">
                  <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
                    Go to home
                  </Link>
                </div>
                <div className="btn btn-warning">
                  <Link to='/orders' style={{ textDecoration: 'none', color: 'black' }}>
                    Click here to view Order details
                  </Link>
                </div>
              </div>
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
                  &nbsp;&nbsp;Your order has not been confirmed. Please complete the payment for your selected product. <br />
                  <span style={{color:"green"}}>Order Id is : {orderId} </span>
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
                <div className="mb-3">
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    checked={selectedPaymentMethod === 'stripe'}
                    onChange={() => setSelectedPaymentMethod('stripe')}
                  />
                  <label htmlFor="stripe">Stripe</label>
                  <Elements stripe={stripePromise}>
                    {selectedPaymentMethod === 'stripe' && <PaymentForm handlePayment={handlePayment} />}
                  </Elements>
                </div>
                <div>
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={selectedPaymentMethod === 'paypal'}
                    onChange={() => setSelectedPaymentMethod('paypal')}
                  />
                  <label htmlFor="paypal">PayPal</label>
                  {selectedPaymentMethod === 'paypal' && (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              currency_code: getCurrency === 'inr' ? 'INR' : 'USD',
                              value: calculateTotalAmount() / 100,
                            },
                          }],
                        });
                      }}
                      onApprove={handlePayPalSuccess}
                    />
                  )}
                </div>
              </div>
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
  customer : state.auth.customer.data.customer_address
});

export default connect(mapStateToProps)(OrderConfirm);
