'use server';

import redis from "../redis";
import { prisma } from '@/lib/prisma';
import { Donor } from "@prisma/client";
import { DonorSchema } from "@/prisma/generated/zod";

export async function fetchWithCache(url: string) {
  const cacheKey = `cache_key:${url}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    await redis.set(cacheKey, JSON.stringify(data), "EX", 3600);

    return data;
  }
  catch (e: unknown) {
    throw new Error(e instanceof Error ? e.message : "Unknown error");
  }
}

export async function cacheDonors(): Promise<{success: boolean, data: Donor[] | null}>{
  const cacheKey = "donors";
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return { success: true, data: DonorSchema.array().parse(JSON.parse(cachedData))};
  }

  try {
    const donors = await prisma.donor.findMany();
    await redis.set(cacheKey, JSON.stringify(donors), "EX", 3600);
    return { success: true, data: donors };
  } catch (error) {
    console.error("[getDonor] Failed to fetch donors:", error);
    return { success: false, data: null };
  }
}