'use server';

import redis from "../redis";

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
  catch (e: any) {
    throw new Error(e.message);
  }
}