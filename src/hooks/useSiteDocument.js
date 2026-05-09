import { useEffect, useState } from 'react';

/**
 * Bundled JSON (imported) is shown immediately; optional same file under
 * public/site-content/ overrides after fetch — swap files on the host without a full redeploy.
 */
export function useSiteDocument(bundled, fileBase) {
  const [doc, setDoc] = useState(bundled);

  useEffect(() => {
    const base = process.env.PUBLIC_URL || '';
    fetch(`${base}/site-content/${fileBase}.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no remote doc'))))
      .then(setDoc)
      .catch(() => {});
  }, [fileBase]);

  return doc;
}
