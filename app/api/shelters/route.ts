import { NextRequest, NextResponse } from 'next/server';
import { getShelters } from '@/lib/actions/shelter';
import { GetSheltersParamsSchema } from '@/lib/actions/shelter.schema';

export async function GET(req: NextRequest) {
  try {
    const filter = req.nextUrl.searchParams.get('filter');
    const params = filter
      ? GetSheltersParamsSchema.safeParse(JSON.parse(filter))
      : { success: true, data: {} };

    if (!params.success) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 },
      );
    }

    const result = await getShelters(params.data);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch shelters' },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching shelters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
