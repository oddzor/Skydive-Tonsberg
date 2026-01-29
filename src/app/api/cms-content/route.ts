import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { join } from 'path';

const BLOB_FILENAME = 'cms-content.json';
const LOCAL_CONTENT_FILE = join(process.cwd(), 'public', 'cms-content.json');

async function getContent() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_FILENAME });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        return await response.text();
      }
    } catch (error) {
      console.log('Blob not found, using local file as fallback:', error);
    }
  }
  return await readFile(LOCAL_CONTENT_FILE, 'utf-8');
}

export async function GET() {
  try {
    const content = await getContent();
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
    const jsonString = JSON.stringify(data, null, 2);
    
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(BLOB_FILENAME, jsonString, {
          access: 'public',
          contentType: 'application/json',
        });
        console.log('Successfully saved to Blob storage:', blob.url);
        return NextResponse.json({ success: true, storage: 'blob', url: blob.url });
      } catch (blobError) {
        console.error('Blob storage error:', blobError);
        return NextResponse.json({ 
          error: 'Blob Storage not configured. Please set up Vercel Blob Storage in your Vercel dashboard (Storage tab → Create Database → Blob)',
          details: blobError instanceof Error ? blobError.message : 'Unknown error'
        }, { status: 503 });
      }
    } else {
      const { writeFile } = await import('fs/promises');
      await writeFile(LOCAL_CONTENT_FILE, jsonString);
      console.log('Successfully saved to local file');
      return NextResponse.json({ success: true, storage: 'local' });
    }
  } catch (error) {
    console.error('Error saving CMS content:', error);
    return NextResponse.json({ 
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
