import { createClient } from 'next-sanity'
import { getFromSnapshot } from './snapshot'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

/**
 * Fetch from Sanity, falling back to the committed snapshot on failure.
 * Pass a `fallbackKey` (dot-notation) matching a key in src/sanity/snapshot.json,
 * e.g. 'tandemPricing' or 'faqs.kurs'.
 * Keep the snapshot current by running: npm run sanity:snapshot
 */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, string>,
  fallbackKey?: string,
): Promise<T | null> {
  if (!projectId || projectId === 'your-project-id') {
    return fallbackKey ? getFromSnapshot<T>(fallbackKey) : null
  }
  try {
    return await serverClient.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity] fetch failed, using snapshot fallback:', err)
    return fallbackKey ? getFromSnapshot<T>(fallbackKey) : null
  }
}
