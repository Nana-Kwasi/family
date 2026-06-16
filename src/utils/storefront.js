const PRINTIFY_FALLBACK = process.env.REACT_APP_PRINTIFY_STORE_URL || '';
const ETSY_FALLBACK = process.env.REACT_APP_ETSY_STORE_URL || '';
const PRIORITY = (process.env.REACT_APP_OFFICIAL_STORE_PRIORITY || 'etsy').toLowerCase();

/**
 * One official checkout path per product: prefer Printify or Etsy based on env,
 * then fall back to store-wide URLs. Same logic everywhere (cards, detail, bundles).
 */
export function getOfficialPurchaseTarget(product) {
  // Amazon is now the official storefront — always prefer it when present.
  const aUrl = (product?.amazonUrl || '').trim();
  if (aUrl) return { url: aUrl, channel: 'amazon' };

  const pUrl = (product?.printifyUrl || '').trim();
  const eUrl = (product?.etsyUrl || '').trim();

  if (PRIORITY === 'etsy') {
    if (eUrl) return { url: eUrl, channel: 'etsy' };
    if (pUrl) return { url: pUrl, channel: 'printify' };
  } else {
    if (pUrl) return { url: pUrl, channel: 'printify' };
    if (eUrl) return { url: eUrl, channel: 'etsy' };
  }

  if (PRINTIFY_FALLBACK) return { url: PRINTIFY_FALLBACK, channel: 'store_printify' };
  if (ETSY_FALLBACK) return { url: ETSY_FALLBACK, channel: 'store_etsy' };
  return { url: '', channel: 'none' };
}
