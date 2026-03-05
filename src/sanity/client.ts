import { createClient } from 'next-sanity'

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

export async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!projectId || projectId === 'your-project-id') return null
  try {
    if (params) {
      return await serverClient.fetch<T>(query, params)
    }
    return await serverClient.fetch<T>(query)
  } catch {
    return null
  }
}
