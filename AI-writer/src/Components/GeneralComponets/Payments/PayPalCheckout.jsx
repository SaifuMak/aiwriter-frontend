import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

function PayPalCheckout() {


  const handlePaymentSuccess = async (details, data) => {
    console.log(data)
    return

    
    try {
      const response = await axios.post('/api/paypal/complete-payment/', {
        orderID: data.orderID
      });
      if (response.data.status === 'success') {
        alert('Payment completed and verified!');
      } else {
        alert('Payment verification failed!');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AdulRESLT1KckqT6wVzwRzNODSD6anpDq3DnrWx77WEsOt2KuoMrcmGbgWKLqhx0kUerJ6CodZ4x8S6L" }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: '5.00' } }]
          });
        }}

        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            handlePaymentSuccess(details, data);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalCheckout;
