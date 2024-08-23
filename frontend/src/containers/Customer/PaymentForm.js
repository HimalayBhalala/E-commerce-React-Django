import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error.message);
    } else {
      handlePayment(paymentMethod.id, 'stripe');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="btn mt-3 btn-outline-primary" style={{ width: "10rem" }}>
        Pay with Stripe
      </button>
    </form>
  );
};

export default PaymentForm;
