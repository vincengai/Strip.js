import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

import {CardElement} from '@stripe/react-stripe-js';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
  };

  // const {data: clientSecret } = await axios.post('/api/payment_intents', {
  //   // reason being *100 , stripe interprets 1$ and 100cents. 
  //   amount: price * 100,
  // });
  //create a payment intent on the server
  //  client_secret of that payment intent

  // need reference to the CardElement
  // need stripe.js 
  // create a payment method
   
  // confirm the card Payments
  //payment method id
  //client_secret 
  const cardElementOptions = {
    // injecting styles into that iframe
    // base , invalid input, or completed input
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        "::placeholder": {
          color: '#87bbfd'
        }
      },
      invalid: {
        color: '#FFC7EE',
        iconColor: "FFC7EE"
      },
      complete: {
      }
    },
    hidePostalCode: true
  }


  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement options={cardElementOptions}/>
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
