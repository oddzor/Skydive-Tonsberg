export async function GET() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!token || !pageId) {
    return Response.json({ events: [] });
  }

  try {
    const fields = 'id,name,description,start_time,end_time,cover,place,attending_count,is_canceled';
    const url = `https://graph.facebook.com/v20.0/${pageId}/events?fields=${fields}&since=now&limit=10&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.error || !data.data) {
      return Response.json({ events: [] });
    }

    return Response.json({ events: data.data });
  } catch {
    return Response.json({ events: [] });
  }
}
