import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('facebook-events', { expire: 604800 });

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const checkRes = await fetch(
    `https://graph.facebook.com/v21.0/${pageId}/events?fields=id&since=now&limit=1&access_token=${token}`
  );
  const checkData = await checkRes.json();

  if (checkData.error) {
    console.error('[revalidate-events] Facebook token check failed:', checkData.error.message, '| code:', checkData.error.code);
    return NextResponse.json(
      { revalidated: true, tag: 'facebook-events', tokenError: checkData.error.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ revalidated: true, tag: 'facebook-events', timestamp: new Date().toISOString() });
}
