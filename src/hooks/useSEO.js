import { useEffect } from 'react';

const SITE_NAME = 'Mama Africa Official Ghana';
const DEFAULT_IMAGE = '/images/afia-hero.jpg';

export default function useSEO({ title, description, image, url } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    const set = (attr, key, val) => {
      if (!val) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    const img = image || DEFAULT_IMAGE;
    const pageUrl = url || window.location.href;

    set('name', 'description', description);
    set('property', 'og:title', fullTitle);
    set('property', 'og:description', description);
    set('property', 'og:image', img);
    set('property', 'og:url', pageUrl);
    set('property', 'og:type', 'website');
    set('property', 'og:site_name', SITE_NAME);
    set('name', 'twitter:card', 'summary_large_image');
    set('name', 'twitter:title', fullTitle);
    set('name', 'twitter:description', description);
    set('name', 'twitter:image', img);
  }, [title, description, image, url]);
}
