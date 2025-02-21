import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { Stripe } from "stripe";

export async function POST(req: Request): Promise<NextResponse> {
  let event: Stripe.Event;

  try {
    const signature = (await headers()).get("stripe-signature");
    if (!signature) throw new Error("Missing Stripe signature");

    const body = await req.text();

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook Error: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  const permittedEvents: string[] = ["payment_intent.succeeded"];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const data = event.data.object as Stripe.PaymentIntent;
          console.log(`Payment status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error("Webhook handler failed", error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
