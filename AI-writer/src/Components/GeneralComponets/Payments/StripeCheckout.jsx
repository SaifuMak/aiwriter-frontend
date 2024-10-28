// Checkout.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Axiosinstance from '../../../Axios/Axiosinstance';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QE1VQJN7jDpKSSQxJ8sJ6r7TRweKoTKY8bCwzwMRLmVTNenHhHFfi6QwDpS3I1raNNwo52VpQie8SrlDzx63Vjp00VIO5XxmF');


const StripeCheckout = ({ SelectedPlanDetails }) => {

    const { PlanName, PlanPrice,  PlanDetails } = SelectedPlanDetails


    
    const handleCheckout = async () => {
    
        const stripe = await stripePromise;

        try {

            // Create a checkout session by calling the Django backend
            const response = await Axiosinstance.post(`payment/stripe-checkout`, SelectedPlanDetails)

            console.log(response)
            const { sessionId } = response.data;

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) console.error('Stripe Checkout error');
        } catch (error) {
            console.error('Error creating checkout session', error);
        }
    };



    return (
        <div>
            <h1>Subscribe to {PlanName}-{PlanPrice}</h1>
            <button onClick={handleCheckout} className='px-6 py-2 text-white bg-indigo-500'>Proceed to Checkout</button>
        </div>
    );
};

export default StripeCheckout;
