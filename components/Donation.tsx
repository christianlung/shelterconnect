'use client';

import { useState } from 'react';
import CheckoutForm from './Checkout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Donation() {
  const [amount, setAmount] = useState<string>('');
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('Anonymous');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [finalDonorAmount, setFinalDonorAmount] = useState<string>('');

  const handleDonationRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount =
      amount === 'custom' ? Number(customAmount) : Number(amount);
    if (!finalAmount || finalAmount < 1) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);
    setFinalDonorAmount(finalAmount.toString());

    try {
      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationAmount: finalAmount }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setAnonymous((prev) => !prev);
    if (!anonymous) {
      setDonorName('Anonymous');
    } else {
      setDonorName('');
    }
  };

  return clientSecret ? (
    <CheckoutForm
      clientSecret={clientSecret}
      donorName={donorName}
      finalDonorAmount={finalDonorAmount}
    />
  ) : (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="h-8 w-8 text-primary-500"
          />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Make a Donation
        </h2>
        <p className="text-gray-600">Choose your donation amount below</p>
      </div>

      <form onSubmit={handleDonationRequest} className="space-y-6">
        <div className="space-y-4">
          <Select onValueChange={(value) => setAmount(value)}>
            <SelectTrigger className="h-12 w-full text-lg">
              <SelectValue placeholder="Select Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">$5</SelectItem>
              <SelectItem value="10">$10</SelectItem>
              <SelectItem value="20">$20</SelectItem>
              <SelectItem value="50">$50</SelectItem>
              <SelectItem value="100">$100</SelectItem>
              <SelectItem value="custom">Custom Amount</SelectItem>
            </SelectContent>
          </Select>

          {amount === 'custom' && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="h-12 w-full pl-8 text-lg"
              />
            </div>
          )}

          {!anonymous && (
            <Input
              type="text"
              placeholder="Your Name"
              value={donorName === 'Anonymous' ? '' : donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="h-12 w-full text-lg"
            />
          )}

          <div className="flex items-center space-x-3 py-2">
            <Checkbox
              id="anonymous"
              checked={anonymous}
              onCheckedChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label
              htmlFor="anonymous"
              className="cursor-pointer select-none text-base text-gray-700"
            >
              Donate Anonymously
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            loading || !amount || (amount === 'custom' && !customAmount)
          }
          className="h-12 w-full rounded-lg bg-primary-500 px-4 py-3 text-lg font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </form>
    </div>
  );
}
