export function localImageSrc(cmsPath: string | null | undefined, fallback: string): string {
  const path = cmsPath && typeof cmsPath === 'string' && (cmsPath.startsWith('/') || cmsPath.startsWith('https://')) ? cmsPath : fallback;
  return path;
}
