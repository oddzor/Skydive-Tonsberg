export function localImageSrc(cmsPath: string | undefined, fallback: string): string {
  const path = cmsPath && typeof cmsPath === 'string' && cmsPath.startsWith('/') ? cmsPath : fallback;
  return path;
}

export function instructorCoachingSrc(cmsPath: string | undefined): string {
  const path = localImageSrc(cmsPath, '/happy-aff-student.webp');
  return path === '/aff-instructor-coaching.webp' ? '/happy-aff-student.webp' : path;
}
