import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { handleStripeWebhook } from '@/lib/actions/stripe';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const signature = (await headers()).get('stripe-signature');
    if (!signature) {
      return NextResponse.json(
        { message: 'Missing Stripe signature' },
        { status: 400 },
      );
    }

    const body = await req.text();
    const result = await handleStripeWebhook({ body, signature });

    console.log(`Payment status: ${result.data.status}`);
    return NextResponse.json({ message: 'Received' }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook Error: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }
}
