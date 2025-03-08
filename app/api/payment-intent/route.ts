'use server'

import { NextResponse } from 'next/server';
import { createPaymentIntent, PaymentIntentAmountSchema } from '@/lib/actions/stripe';

export async function POST(req: Request) {
  try {
    const { donationAmount } = await req.json();

    const amount = PaymentIntentAmountSchema.safeParse(donationAmount);

    if (!amount.success) {
      return NextResponse.json({ error: 'Invalid donation amount' }, { status: 400 });
    }

    const paymentIntent = await createPaymentIntent(amount.data);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch {
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
