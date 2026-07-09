const DEFAULT_FAVICON = '/favicon.svg';

export function setFavicon(url: string | null | undefined) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.href = url || DEFAULT_FAVICON;
}

export function resetFavicon() {
  setFavicon(null);
}
