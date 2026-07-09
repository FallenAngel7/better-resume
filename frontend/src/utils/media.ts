export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;

  const apiOrigin = import.meta.env.VITE_API_ORIGIN;
  return apiOrigin ? `${apiOrigin}${url}` : url;
}
