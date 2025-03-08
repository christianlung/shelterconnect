'use server';

import { stripe } from '@/lib/stripe';
import { createPaymentIntent, handleStripeWebhook } from './stripe';
import Stripe from 'stripe';

const originalCreate = stripe.paymentIntents.create;
const originalConstructEvent = stripe.webhooks.constructEvent;

describe(createPaymentIntent, () => {
  beforeEach(() => {
    stripe.paymentIntents.create = originalCreate;
  });

  afterAll(() => {
    stripe.paymentIntents.create = originalCreate;
  });

  it('should create a payment intent with correct amount', async () => {
    const mockPaymentIntent = {
      id: 'pi_123',
      amount: 1000,
      currency: 'usd',
      status: 'requires_payment_method',
      lastResponse: {
        headers: {},
        requestId: 'req_123',
        statusCode: 200,
      },
    };

    const createSpy = jest.spyOn(stripe.paymentIntents, 'create');
    createSpy.mockResolvedValueOnce(
      mockPaymentIntent as Stripe.Response<Stripe.PaymentIntent>,
    );

    const result = await createPaymentIntent(10);

    expect(createSpy).toHaveBeenCalledWith({
      amount: 10 * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    expect(result).toEqual(mockPaymentIntent);

    createSpy.mockRestore();
  });

  it('should throw error for invalid amount', async () => {
    await expect(createPaymentIntent(0)).rejects.toThrow();
    await expect(createPaymentIntent(-1)).rejects.toThrow();
  });
});

describe(handleStripeWebhook, () => {
  const mockSignature = 'mock_signature';
  const mockSecret = 'mock_secret';
  process.env.STRIPE_WEBHOOK_SECRET = mockSecret;

  beforeEach(() => {
    stripe.webhooks.constructEvent = originalConstructEvent;
  });

  afterAll(() => {
    stripe.webhooks.constructEvent = originalConstructEvent;
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  it('should handle payment_intent.succeeded event', async () => {
    const mockPaymentIntent = {
      id: 'pi_123',
      object: 'payment_intent',
      amount: 1000,
      status: 'succeeded',
    };

    const mockEvent = {
      type: 'payment_intent.succeeded',
      data: {
        object: mockPaymentIntent,
      },
    };

    const constructEventSpy = jest.spyOn(stripe.webhooks, 'constructEvent');
    constructEventSpy.mockReturnValueOnce(mockEvent as Stripe.Event);

    const result = await handleStripeWebhook({
      body: 'mock_body',
      signature: mockSignature,
    });

    expect(constructEventSpy).toHaveBeenCalledWith(
      'mock_body',
      mockSignature,
      mockSecret,
    );
    expect(result).toEqual({
      type: 'payment_intent.succeeded',
      data: mockPaymentIntent,
    });

    constructEventSpy.mockRestore();
  });

  it('should throw error for invalid webhook signature', async () => {
    const constructEventSpy = jest.spyOn(stripe.webhooks, 'constructEvent');
    constructEventSpy.mockImplementationOnce(() => {
      throw new Error('Invalid signature');
    });

    await expect(
      handleStripeWebhook({
        body: 'mock_body',
        signature: 'invalid_signature',
      }),
    ).rejects.toThrow('Invalid signature');

    constructEventSpy.mockRestore();
  });

  it('should throw error for unhandled event type', async () => {
    const mockEvent = {
      type: 'unhandled.event',
      data: {
        object: {},
      },
    };

    const constructEventSpy = jest.spyOn(stripe.webhooks, 'constructEvent');
    constructEventSpy.mockReturnValueOnce(mockEvent as Stripe.Event);

    await expect(
      handleStripeWebhook({
        body: 'mock_body',
        signature: mockSignature,
      }),
    ).rejects.toThrow('Unhandled event type: unhandled.event');

    constructEventSpy.mockRestore();
  });
});
