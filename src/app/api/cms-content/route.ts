import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
const CONTENT_FILE = join(process.cwd(), 'public', 'cms-content.json');
export async function GET() {
  try {
    const content = await readFile(CONTENT_FILE, 'utf-8');
    const response = NextResponse.json(JSON.parse(content));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error reading CMS content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    await writeFile(CONTENT_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving CMS content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
