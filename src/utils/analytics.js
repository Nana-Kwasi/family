const CONSENT_KEY = 'afia_cookie_consent_v1';
const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';

let gtagScriptInjected = false;

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(CONSENT_KEY) === 'granted';
}

function ensureGtagStub() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

function injectGtagLibrary() {
  if (typeof document === 'undefined' || !GA_ID || gtagScriptInjected) return;
  gtagScriptInjected = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.onload = () => {
    ensureGtagStub();
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };
  document.head.appendChild(s);
}

export function setAnalyticsConsent(granted) {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');

  if (granted && GA_ID) {
    injectGtagLibrary();
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }
}

export function getConsentKey() {
  return CONSENT_KEY;
}

/** Run once on app load: stub + default deny (matches index.html), inject GA only if already opted in */
export function bootstrapAnalyticsFromStorage() {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  if (hasAnalyticsConsent() && GA_ID) {
    injectGtagLibrary();
  }
}

export function trackEvent(name, params = {}) {
  if (!name) return;
  if (!hasAnalyticsConsent()) return;

  try {
    ensureGtagStub();
    if (GA_ID && !gtagScriptInjected) {
      injectGtagLibrary();
    }
    if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GA_ID) {
      window.gtag('event', name, params);
      return;
    }

    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info('[analytics]', name, params);
    }
  } catch {
    // ignore
  }
}
