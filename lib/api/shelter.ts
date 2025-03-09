import { GetSheltersParams } from '@/lib/actions/shelter.schema';

export async function getShelters(params: GetSheltersParams) {
  const searchParams = new URLSearchParams({ filter: JSON.stringify(params) });
  const response = await fetch(`/api/shelters?${searchParams}`);
  return response.json();
}
