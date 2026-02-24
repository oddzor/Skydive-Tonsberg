import { NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { join } from 'path';

const BLOB_FILENAME = 'cms-content.json';
const LOCAL_CONTENT_FILE = join(process.cwd(), 'public', 'cms-content.json');

type JsonObject = Record<string, unknown>;
function deepMerge(base: JsonObject, override: JsonObject): JsonObject {
  const result: JsonObject = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (
      overrideVal !== null &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(baseVal as JsonObject, overrideVal as JsonObject);
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

async function getContent() {
  const localText = await readFile(LOCAL_CONTENT_FILE, 'utf-8');
  const localContent = JSON.parse(localText) as JsonObject;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_FILENAME });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        const blobContent = JSON.parse(await response.text()) as JsonObject;
        return JSON.stringify(deepMerge(localContent, blobContent));
      }
    } catch (error) {
      console.log('Blob not accessible, using local file:', error);
    }
  }

  return JSON.stringify(localContent);
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
        const { blobs } = await list({ prefix: BLOB_FILENAME });
        if (blobs.length > 0) {
          await del(blobs.map(blob => blob.url));
          console.log('Deleted existing blob(s)');
        }
        
        const blob = await put(BLOB_FILENAME, jsonString, {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false,
        });
        console.log('Successfully saved to Blob storage:', blob.url);
        return NextResponse.json({ success: true, storage: 'blob', url: blob.url });
      } catch (blobError) {
        console.error('Blob storage error, falling back to local file:', blobError);
        const { writeFile } = await import('fs/promises');
        await writeFile(LOCAL_CONTENT_FILE, jsonString);
        console.log('Successfully saved to local file (blob fallback)');
        return NextResponse.json({ success: true, storage: 'local-fallback' });
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
