"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { donorName, finalDonorAmount } = await req.json();

    const newDonor = await prisma.donor.create({
      data: { donorName, finalDonorAmount },
    });
    console.log({newDonor})
    return NextResponse.json(newDonor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create donor" }, { status: 500 });
  }
}
