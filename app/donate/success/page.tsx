import { redirect } from 'next/navigation';
import { stripe } from '../../../lib/stripe';
import { JSX } from 'react';

type StatusType = 'succeeded' | 'processing' | 'requires_payment_method' | 'default';

type StatusContent = {
  text: string;
  iconColor: string;
  icon: JSX.Element;
};

const SuccessIcon: JSX.Element = (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white"/>
  </svg>
);

const ErrorIcon: JSX.Element = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white"/>
  </svg>
);

const InfoIcon: JSX.Element = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="white"/>
  </svg>
);

const STATUS_CONTENT_MAP: Record<StatusType, StatusContent> = {
  succeeded: {
    text: "Payment succeeded",
    iconColor: "#30B130",
    icon: SuccessIcon,
  },
  processing: {
    text: "Your payment is processing.",
    iconColor: "#6D6E78",
    icon: InfoIcon,
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  },
  default: {
    text: "Something went wrong, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  },
};

type SuccessPageProps = {
  searchParams: { payment_intent?: string };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const paymentIntentId = searchParams.payment_intent;
  
  if (!paymentIntentId) redirect('/');

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!paymentIntent) redirect('/');

  const status = (paymentIntent.status as StatusType) || 'default';

  return (
    <div id="payment-status">
      <div id="status-icon" style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}>
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
      {paymentIntent && (
        <div id="details-table">
          <table>
            <tbody>
              <tr>
                <td className="TableLabel">id</td>
                <td id="intent-id" className="TableContent">{paymentIntentId}</td>
              </tr>
              <tr>
                <td className="TableLabel">status</td>
                <td id="intent-status" className="TableContent">{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {paymentIntent && (
        <a href={`https://dashboard.stripe.com/payments/${paymentIntentId}`} id="view-details" target="_blank" rel="noopener noreferrer">
          View details
        </a>
      )}
    </div>
  );
}
