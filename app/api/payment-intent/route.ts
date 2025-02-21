'use server'

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const { donationAmount } = await req.json();

    if (!donationAmount || donationAmount < 1) {
      return NextResponse.json({ error: 'Invalid donation amount' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: donationAmount * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
