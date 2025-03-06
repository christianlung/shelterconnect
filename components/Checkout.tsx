'use client';

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

interface PaymentFormProps {
  donorName: string;
  finalDonorAmount: string;
}

function PaymentForm( { donorName, finalDonorAmount} : PaymentFormProps ) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/donate/success",
      },
      redirect: "if_required",
    });    

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    if (!error) {
      console.log("paid!")
    }
    
    try {
      const response = await fetch("/api/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorName,
          finalDonorAmount,
        }),
      })
  
      if (response.ok) {
        const data = await response.json()
        console.log("Donor posted", data)
      } else {
        console.error("Failed to post donor name")
      }
    }
    catch (e) {

    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: false
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Donate now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

interface CheckoutFormProps {
  clientSecret: string;
  donorName: string;
  finalDonorAmount: string;
}

export default function CheckoutForm({ clientSecret, donorName, finalDonorAmount }: CheckoutFormProps) {
  console.log({donorName, finalDonorAmount})
  const appearance = {
    theme: 'stripe' as const,
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm donorName={donorName} finalDonorAmount={finalDonorAmount}/>
    </Elements>
  )
}