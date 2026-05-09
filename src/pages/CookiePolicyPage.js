import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { useSiteDocument } from '../hooks/useSiteDocument';
import bundled from '../site-content/cookie-policy.json';

export default function CookiePolicyPage() {
  const doc = useSiteDocument(bundled, 'cookie-policy');
  return <LegalDocumentPage doc={doc} />;
}
