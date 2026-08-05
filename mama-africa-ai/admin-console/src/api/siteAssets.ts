const SITE_BASE = (import.meta.env.VITE_SITE_BASE_URL || 'http://localhost:3002').replace(/\/$/, '');

/**
 * Turns a stored image path into something the console can render.
 *
 * Product images are site-relative (/images/...) because they are served by the website, not
 * by the API. The console lives on a different origin, so previews need the site prefixed.
 */
export function siteImageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_BASE}${path.startsWith('/') ? '' : '/'}${encodeURI(path)}`;
}
