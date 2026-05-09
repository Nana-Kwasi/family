import React from 'react';

const pStyle = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: 'clamp(18px,2.2vw,21px)',
  lineHeight: 1.9,
  color: '#EDD9BC',
  marginBottom: 20,
  whiteSpace: 'pre-line',
};

const h2Style = {
  fontFamily: "'Cinzel', serif",
  fontSize: 'clamp(16px,3vw,22px)',
  color: '#C9A558',
  letterSpacing: '0.08em',
  marginTop: 28,
  marginBottom: 16,
  lineHeight: 1.4,
  borderBottom: '1px solid rgba(201,165,88,0.2)',
  paddingBottom: 10,
};

function Figure({ src, alt, caption, fill }) {
  return (
    <figure
      style={{
        display: 'block',
        width: fill ? '100%' : 'fit-content',
        maxWidth: fill ? '100%' : 'min(100%, 920px)',
        margin: fill ? '0 auto 16px' : '24px auto 28px',
        border: '1px solid rgba(201,165,88,0.22)',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'rgba(201,165,88,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 16px', boxSizing: 'border-box' }}>
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          style={{
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
            maxHeight: 'clamp(200px, 45vh, 420px)',
            objectFit: 'contain',
          }}
        />
      </div>
      {caption ? (
        <figcaption
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(13px,1.7vw,16px)',
            color: '#9E7D42',
            fontStyle: 'italic',
            padding: '10px 14px 12px',
            textAlign: 'center',
            lineHeight: 1.45,
            borderTop: '1px solid rgba(201,165,88,0.12)',
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function HeritageLongformBlocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === 'p') {
      return <p key={i} style={pStyle}>{b.text}</p>;
    }
    if (b.type === 'h2') {
      return <h3 key={i} style={h2Style}>{b.text}</h3>;
    }
    if (b.type === 'list') {
      return (
        <ul key={i} style={{ margin: '0 0 20px', paddingLeft: 22 }}>
          {b.items.map((item, j) => (
            <li
              key={j}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(16px,2vw,19px)',
                color: '#EDD9BC',
                lineHeight: 1.85,
                marginBottom: 10,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (b.type === 'figure') {
      return <Figure key={i} src={b.src} alt={b.alt} caption={b.caption} />;
    }
    if (b.type === 'figureGrid') {
      return (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            margin: '28px 0 32px',
          }}
        >
          {b.figures.map((fig, j) => (
            <Figure key={j} src={fig.src} alt={fig.alt} caption={fig.caption} fill />
          ))}
        </div>
      );
    }
    return null;
  });
}

export default function HeritageLongformEssay({
  id,
  meta,
  blocks,
  eyebrow = 'Essay · Heritage',
  sectionStyle = {},
}) {
  return (
    <section
      id={id}
      style={{
        padding: '0 20px 72px',
        maxWidth: 820,
        margin: '0 auto',
        ...sectionStyle,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            color: '#9E7D42',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h2
          className="section-title"
          style={{
            fontSize: 'clamp(22px,4.5vw,36px)',
            marginBottom: 12,
            lineHeight: 1.25,
          }}
        >
          {meta.title}
        </h2>
        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(15px,2vw,19px)',
            color: '#BA9D7C',
            fontStyle: 'italic',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {meta.subtitle}
        </p>
      </div>

      <HeritageLongformBlocks blocks={blocks} />
    </section>
  );
}
