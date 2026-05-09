import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { useSiteDocument } from '../hooks/useSiteDocument';
import bundled from '../site-content/terms.json';

export default function TermsPage() {
  const doc = useSiteDocument(bundled, 'terms');
  return <LegalDocumentPage doc={doc} />;
}
