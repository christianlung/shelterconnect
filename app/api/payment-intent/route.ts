import { NextResponse } from 'next/server';
import { createPaymentIntent, PaymentIntentAmountSchema } from '@/lib/actions/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.donationAmount) {
      return NextResponse.json({ error: 'Missing donation amount' }, { status: 400 });
    }

    const { donationAmount } = body;
    
    const amount = PaymentIntentAmountSchema.safeParse(donationAmount);
    if (!amount.success) {
      return NextResponse.json({ error: 'Invalid donation amount' }, { status: 400 });
    }

    const paymentIntent = await createPaymentIntent(amount.data);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
