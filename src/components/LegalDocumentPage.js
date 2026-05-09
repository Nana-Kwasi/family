import React from 'react';

const h2 = { fontFamily: 'var(--font-heading)', fontSize: 'var(--type-section)', color: 'var(--gold)', marginBottom: 8 };
const pStyle = { color: 'var(--cream-dim)', lineHeight: 1.8, margin: '0 0 12px' };

function linkifyText(text) {
  const parts = String(text).split(/(\S+@\S+\.\S+)/);
  return parts.map((part, j) => {
    const e = part.trim();
    if (/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(e)) {
      return (
        <a key={j} href={`mailto:${e}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
          {e}
        </a>
      );
    }
    return part;
  });
}

export default function LegalDocumentPage({ doc }) {
  if (!doc?.sections) return null;
  return (
    <div className="page-wrapper legal-doc-page" style={{ padding: '88px 20px 72px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        <h1 className="type-legal-title" style={{ marginBottom: 10 }}>
          {doc.title}
        </h1>
        <p style={{ color: 'var(--cream-dim)', fontStyle: 'italic', marginBottom: 24 }}>
          {doc.intro}
        </p>

        {doc.sections.map((sec, idx) => (
          <div key={idx} className="afia-card" style={{ marginBottom: 14 }}>
            <h2 style={h2}>{sec.heading}</h2>
            {sec.paragraphs?.map((text, i) => (
              <p key={i} style={{ ...pStyle, marginBottom: i === sec.paragraphs.length - 1 && !sec.regions?.length ? 0 : 12 }}>
                {linkifyText(text)}
              </p>
            ))}
            {sec.regions?.length > 0 && (
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {sec.regions.map((r) => (
                  <div key={r.label} style={{ border: '1px solid var(--gold-border)', borderRadius: 8, padding: 10 }}>
                    <p style={{ margin: '0 0 6px', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.08em' }}>
                      {r.label}
                    </p>
                    <p style={{ margin: 0, color: 'var(--cream-dim)', fontSize: 13, lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
