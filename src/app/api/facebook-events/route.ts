import { unstable_cache } from 'next/cache';

const getCachedEvents = unstable_cache(
  async () => {
    const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;

    if (!token || !pageId) {
      return { events: [], error: 'missing_config' };
    }

    const fields = 'id,name,description,start_time,end_time,cover,place,attending_count,is_canceled';
    const url = `https://graph.facebook.com/v21.0/${pageId}/events?fields=${fields}&since=now&limit=50&access_token=${token}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      const code = data.error.code;
      const errorType = code === 190 ? 'token_expired' : 'api_error';
      console.error('[facebook-events]', data.error.message, '| code:', code);
      return { events: [], error: errorType };
    }

    if (!data.data) {
      return { events: [], error: 'no_data' };
    }

    return { events: data.data };
  },
  ['facebook-events'],
  { tags: ['facebook-events'], revalidate: 604800 }
);

export async function GET() {
  try {
    const result = await getCachedEvents();
    return Response.json(result);
  } catch (err) {
    console.error('[facebook-events] fetch failed:', err);
    return Response.json({ events: [], error: 'fetch_failed' });
  }
}
