import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import type { Stripe } from 'stripe';

export const PaymentIntentAmountSchema = z.number().min(1);

export async function createPaymentIntent(
  amount: z.infer<typeof PaymentIntentAmountSchema>,
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    return paymentIntent;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to create payment intent',
    );
  }
}

export interface WebhookEvent {
  body: string;
  signature: string;
}

export async function handleStripeWebhook(input: WebhookEvent) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      input.body,
      input.signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Invalid webhook payload',
    );
  }

  const permittedEvents: string[] = ['payment_intent.succeeded'];

  if (!permittedEvents.includes(event.type)) {
    throw new Error(`Unhandled event type: ${event.type}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      return { type: event.type, data: paymentIntent };
    default:
      throw new Error(`Unhandled event: ${event.type}`);
  }
}
