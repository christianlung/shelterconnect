'use client';

import { useState } from 'react';
import CheckoutForm from './payment/Checkout';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function Page() {
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDonationRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount === 'custom' ? Number(customAmount) : Number(amount);

    if (!finalAmount || finalAmount < 1) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donationAmount: finalAmount }),
    });

    const data = await res.json();
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  return (
    <div>
      {!clientSecret ? (
        <div id="checkout" className="flex flex-col items-center">
          <p className="text-center text-gray-700 max-w-md mb-6 mt-4">
            Every year, countless families lose their homes and belongings due to devastating wildfires, hurricanes, and other natural disasters. 
            Your donation directly supports those in need by providing emergency shelter, food, medical aid, and essential supplies to help them rebuild their lives. 
            Even a small contribution can make a significant difference in bringing hope and relief to disaster victims. 
            Choose an amount below to donate and stand with those affected.
          </p>
          <form onSubmit={handleDonationRequest} className="space-y-4">
            <Select onValueChange={(value) => setAmount(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">$5</SelectItem>
                <SelectItem value="10">$10</SelectItem>
                <SelectItem value="20">$20</SelectItem>
                <SelectItem value="custom">Custom Amount</SelectItem>
              </SelectContent>
            </Select>

            {amount === 'custom' && (
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-[200px]"
              />
            )}

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              {loading ? 'Processing...' : 'Go to Payment'}
            </button>
          </form>
        </div>
      ) : (
        <CheckoutForm clientSecret={clientSecret} />
      )}
    </div>
  );
}
