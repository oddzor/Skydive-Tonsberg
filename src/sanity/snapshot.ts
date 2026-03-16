import { readFileSync } from 'fs'
import { join } from 'path'

let cached: Record<string, unknown> | null = null

function loadSnapshot(): Record<string, unknown> {
  if (cached) return cached
  try {
    const raw = readFileSync(join(process.cwd(), 'src/sanity/snapshot.json'), 'utf-8')
    cached = JSON.parse(raw)
    return cached!
  } catch {
    return {}
  }
}

export function getFromSnapshot<T>(key: string): T | null {
  const snapshot = loadSnapshot()
  const parts = key.split('.')
  let value: unknown = snapshot
  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[part]
    } else {
      return null
    }
  }
  return (value ?? null) as T | null
}
