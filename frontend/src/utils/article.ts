export function slugify(text: string): string {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || `article-${Date.now()}`;
}

export function formatArticleDate(date: string): string {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
