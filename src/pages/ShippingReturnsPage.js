import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { useSiteDocument } from '../hooks/useSiteDocument';
import bundled from '../site-content/shipping-returns.json';

export default function ShippingReturnsPage() {
  const doc = useSiteDocument(bundled, 'shipping-returns');
  return <LegalDocumentPage doc={doc} />;
}
