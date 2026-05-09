import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { useSiteDocument } from '../hooks/useSiteDocument';
import bundled from '../site-content/privacy-policy.json';

export default function PrivacyPolicyPage() {
  const doc = useSiteDocument(bundled, 'privacy-policy');
  const merged = {
    ...doc,
    intro: `Effective ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. ${doc.intro || ''}`,
  };
  return <LegalDocumentPage doc={merged} />;
}
