export function localImageSrc(cmsPath: string | null | undefined, fallback: string): string {
  const path = cmsPath && typeof cmsPath === 'string' && (cmsPath.startsWith('/') || cmsPath.startsWith('https://')) ? cmsPath : fallback;
  return path;
}

export function instructorCoachingSrc(cmsPath: string | null | undefined): string {
  const path = localImageSrc(cmsPath, '/happy-aff-student.webp');
  return path === '/aff-instructor-coaching.webp' ? '/happy-aff-student.webp' : path;
}
