"use client";

import { useState } from "react";
import CheckoutForm from "./Checkout";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
    const finalAmount = amount === "custom" ? Number(customAmount) : Number(amount);
    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);
    setFinalDonorAmount(finalAmount.toString());

    const res = await fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donationAmount: finalAmount }),
    });

    const data = await res.json();
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  const handleCheckboxChange = () => {
    setAnonymous((prev) => !prev);
  };

  return clientSecret ? (
    <CheckoutForm clientSecret={clientSecret} donorName={donorName} finalDonorAmount={finalDonorAmount} />
  ) : (
    <form onSubmit={handleDonationRequest} className="space-y-4 flex flex-col items-center">
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

      {!anonymous && (
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setDonorName(e.target.value)}
          className="w-[200px]"
        />
      )}

      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" checked={anonymous} onCheckedChange={handleCheckboxChange} />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Donate Anonymously
          </label>
        </div>
      </div>

      {amount === "custom" && (
        <Input
          type="number"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-[200px]"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Go to Payment"}
      </button>
    </form>
  );
}
