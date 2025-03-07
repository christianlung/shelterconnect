"use client";

import { useState, useEffect } from "react";
import { getDonor } from "@/lib/actions/donor";
import { Donor } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonors() {
      const result = await getDonor();
      if (result.success) {
        setDonors(result.data);
      }
      setLoading(false);
    }
    fetchDonors();
  }, []);

  if (loading) return <p>Loading donors...</p>;

  return (
    <Table>
      <TableCaption>A list of our amazing donors!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Donor</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donors.map((donor) => (
          <TableRow key={donor.id}>
            <TableCell className="font-medium">{donor.donorName}</TableCell>
            <TableCell className="text-right">${donor.finalDonorAmount}</TableCell>
            <TableCell className="text-right">{new Date(donor.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
