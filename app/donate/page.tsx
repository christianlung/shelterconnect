import CheckoutForm from '../../components/Checkout'
import { stripe } from '../api/payment-intent/route'

export default async function Page() {

//   const calculateOrderAmount = (items) => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     return 1400;
//   };

  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return (
    <div id="checkout">
      <CheckoutForm clientSecret={clientSecret as string} />
    </div>
  )
}