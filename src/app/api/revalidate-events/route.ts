import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('facebook-events');

  return NextResponse.json({ revalidated: true, tag: 'facebook-events', timestamp: new Date().toISOString() });
}
