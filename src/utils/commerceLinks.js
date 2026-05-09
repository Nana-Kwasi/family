function withUtm(url, utm) {
  try {
    const parsed = new URL(url);
    Object.entries(utm).forEach(([key, value]) => {
      if (!value) return;
      parsed.searchParams.set(key, value);
    });
    return parsed.toString();
  } catch {
    return url;
  }
}

export function buildTrackedExternalUrl(url, options = {}) {
  if (!url) return '';
  const {
    source = 'afia_site',
    medium = 'referral',
    campaign = 'gift_collection',
    content = '',
  } = options;

  return withUtm(url, {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  });
}

