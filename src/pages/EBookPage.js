import React, { useState, useEffect, useRef } from 'react';
import { fetchReviews, fetchStories, recordBookRead, submitReview } from '../utils/cultureApi';
import { bookSections, bookMeta } from '../data/bookContent';
import { notifyAfiaBookFeedback } from '../utils/emailjs';

// ── Rendering helpers ─────────────────────────────────────────────────────────

function BookBlock({ block }) {
  const bodyStyle = {
    fontFamily: "'EB Garamond', Georgia, serif",
    fontSize: 18,
    lineHeight: 1.9,
    color: '#EDD9BC',
    marginBottom: 22,
  };

  switch (block.type) {
    case 'title':
      return (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,4vw,36px)', color: '#C9A558', letterSpacing: '0.1em', lineHeight: 1.4 }}>{block.text}</h1>
        </div>
      );
    case 'subtitle':
      return <p style={{ textAlign: 'center', fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#BA9D7C', fontStyle: 'italic', marginBottom: 16 }}>{block.text}</p>;
    case 'author':
      return <p style={{ textAlign: 'center', fontFamily: "'Cinzel', serif", fontSize: 14, color: '#9E7D42', letterSpacing: '0.14em', marginTop: 28, textTransform: 'uppercase' }}>{block.text}</p>;
    case 'heading':
      return <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 24, borderBottom: '1px solid rgba(201,165,88,0.2)', paddingBottom: 10 }}>{block.text}</h2>;
    case 'chapter':
      return (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#9E7D42', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Chapter {block.number}</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px,3vw,26px)', color: '#C9A558', letterSpacing: '0.06em', lineHeight: 1.4 }}>{block.text}</h2>
          <div style={{ height: 2, width: 60, background: 'linear-gradient(to right, #C9A558, transparent)', marginTop: 16 }} />
        </div>
      );
    case 'subheading':
      return <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#EDD9BC', letterSpacing: '0.1em', marginTop: 24, marginBottom: 14, textTransform: 'uppercase' }}>{block.text}</h3>;
    case 'body':
      return (
        <p style={bodyStyle}>
          {block.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i < block.text.split('\n').length - 1 && <br />}</React.Fragment>
          ))}
        </p>
      );
    case 'dedication':
      return (
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: '#C9A558', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.8, margin: '28px 0' }}>
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote style={{
          borderLeft: '3px solid #C9A558',
          paddingLeft: 24,
          margin: '28px 0',
          fontFamily: "'EB Garamond', serif",
          fontSize: 20,
          fontStyle: 'italic',
          color: '#C9A558',
          lineHeight: 1.8,
        }}>
          {block.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i < block.text.split('\n').length - 1 && <br />}</React.Fragment>
          ))}
        </blockquote>
      );
    case 'list':
      return (
        <ul style={{ margin: '8px 0 22px 0', paddingLeft: 24 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#EDD9BC', lineHeight: 1.9, marginBottom: 6 }}>{item}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div style={{ overflowX: 'auto', margin: '24px 0 32px', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(201,165,88,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'EB Garamond', serif", fontSize: 18 }}>
            <thead>
              <tr style={{ background: 'rgba(201,165,88,0.08)' }}>
                {block.headers.map((h, i) => (
                  <th key={i} style={{
                    padding: '16px 20px',
                    borderBottom: '2px solid rgba(201,165,88,0.35)',
                    borderRight: i < block.headers.length - 1 ? '1px solid rgba(201,165,88,0.15)' : 'none',
                    color: '#EDD9BC',
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 19,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    letterSpacing: '0.02em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < block.rows.length - 1 ? '1px solid rgba(201,165,88,0.12)' : 'none' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '18px 20px',
                      borderRight: ci < row.length - 1 ? '1px solid rgba(201,165,88,0.1)' : 'none',
                      color: '#EDD9BC',
                      lineHeight: 1.75,
                      fontSize: 18,
                      verticalAlign: 'top',
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'toc':
      return (
        <div style={{ margin: '8px 0 20px' }}>
          {block.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px dotted rgba(201,165,88,0.15)' }}>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#EDD9BC' }}>{item.label}</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#9E7D42', marginLeft: 16, flexShrink: 0 }}>{item.page}</span>
            </div>
          ))}
        </div>
      );
    case 'image':
      return (
        <figure
          style={{
            display: 'block',
            width: 'fit-content',
            maxWidth: 'min(100%, 920px)',
            margin: '22px auto 26px',
            border: '1px solid rgba(201,165,88,0.22)',
            borderRadius: 10,
            overflow: 'hidden',
            background: 'rgba(201,165,88,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 16px', boxSizing: 'border-box' }}>
            <img
              src={block.src}
              alt={block.alt || ''}
              loading="lazy"
              style={{
                display: 'block',
                margin: '0 auto',
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                maxHeight: 'clamp(200px, 42vh, 380px)',
                objectFit: 'contain',
              }}
            />
          </div>
          {block.caption && (
            <figcaption style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#9E7D42', fontStyle: 'italic', padding: '10px 14px 12px', textAlign: 'center', lineHeight: 1.45, borderTop: '1px solid rgba(201,165,88,0.12)' }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ value, onChange, readOnly }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: readOnly ? 'default' : 'pointer',
            fontSize: 28, padding: 0, lineHeight: 1,
            color: star <= (hover || value) ? '#C9A558' : 'rgba(201,165,88,0.25)',
            transition: 'color 0.15s ease',
          }}
        >★</button>
      ))}
    </div>
  );
}

// ── Story Card ────────────────────────────────────────────────────────────────

function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);
  const preview = story.content?.length > 280 ? story.content.slice(0, 280) + '…' : story.content;
  const date = story.createdAt?.toDate?.() || (story.createdAt ? new Date(story.createdAt) : null);

  return (
    <div className="afia-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginRight: 10 }}>
            {story.type === 'proverb' ? 'Proverb' : 'Story'}
          </span>
          {date && <span style={{ fontSize: 12, color: '#7C5F48' }}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
        </div>
      </div>
      {story.title && (
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color: '#EDD9BC', letterSpacing: '0.06em', marginBottom: 14 }}>{story.title}</h3>
      )}
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, lineHeight: 1.85, color: '#BA9D7C', fontStyle: story.type === 'proverb' ? 'italic' : 'normal' }}>
        {expanded ? story.content : preview}
      </p>
      {story.content?.length > 280 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', color: '#9E7D42', cursor: 'pointer', fontSize: 13, fontFamily: "'Cinzel', serif", letterSpacing: '0.1em', padding: '8px 0 0', textDecoration: 'underline' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      {story.socialLinks?.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,165,88,0.12)' }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            Listen to this more
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {story.socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(201,165,88,0.1)',
                  border: '1px solid rgba(201,165,88,0.25)',
                  color: '#C9A558',
                  padding: '7px 14px',
                  borderRadius: 6,
                  fontFamily: "'Cinzel', serif",
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.2)'; e.currentTarget.style.borderColor = '#C9A558'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,165,88,0.25)'; }}
              >
                ↗ {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main EBook Page ───────────────────────────────────────────────────────────

export default function EBookPage() {
  const [activeSection, setActiveSection] = useState('title');
  const [hasFinished, setHasFinished] = useState(false);
  const [stories, setStories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const readerRef = useRef(null);

  const currentSection = bookSections.find(s => s.id === activeSection) || bookSections[0];
  const currentIndex = bookSections.findIndex(s => s.id === activeSection);
  const isLastSection = currentIndex === bookSections.length - 1;

  // Track unique read
  useEffect(() => {
    const key = 'afia_book_read';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      recordBookRead();
    }
  }, []);

  // Load stories
  useEffect(() => {
    let cancelled = false;
    fetchStories()
      .then((list) => { if (!cancelled) setStories(list); })
      .catch(() => { if (!cancelled) setStories([]); });
    return () => { cancelled = true; };
  }, []);

  // Load reviews
  useEffect(() => {
    let cancelled = false;
    fetchReviews('BOOK')
      .then((list) => { if (!cancelled) setReviews(list); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [submitted]);

  function navigate(dir) {
    const next = bookSections[currentIndex + dir];
    if (next) {
      setActiveSection(next.id);
      readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      if (currentIndex + dir === bookSections.length - 1) {
        setHasFinished(true);
      }
    }
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewForm.rating) { setReviewError('Please select a star rating.'); return; }
    if (!reviewForm.comment.trim()) { setReviewError('Please write a comment.'); return; }
    setSubmitting(true);
    try {
      await submitReview({
        subject: 'BOOK',
        subjectTitle: 'Outdooring (Aba-Dinto)',
        name: reviewForm.name.trim() || 'Anonymous',
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      });
      await notifyAfiaBookFeedback({
        name: reviewForm.name || 'Anonymous',
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      }).catch(() => {});
      setSubmitted(true);
    } catch {
      setReviewError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ padding: '72px 20px 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 12 }}>E-Book</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,5vw,38px)', color: '#C9A558', letterSpacing: '0.1em', marginBottom: 8, lineHeight: 1.3 }}>
          {bookMeta.title}
        </h1>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', fontStyle: 'italic', marginBottom: 6 }}>{bookMeta.subtitle}</p>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#7C5F48', letterSpacing: '0.14em', textTransform: 'uppercase' }}>By {bookMeta.author}</p>
        {avgRating && (
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ color: '#C9A558', fontSize: 20 }}>★</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: '#C9A558' }}>{avgRating}</span>
            <span style={{ color: '#7C5F48', fontSize: 14 }}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
          </div>
        )}
      </section>

      {/* Book Reader */}
      <section style={{ padding: '0 20px 64px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, alignItems: 'start' }}>

          {/* Table of Contents Sidebar */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="afia-card" style={{ padding: '16px 0' }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.2em', color: '#9E7D42', textTransform: 'uppercase', padding: '0 16px 12px', borderBottom: '1px solid rgba(201,165,88,0.12)' }}>Contents</div>
              {bookSections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => { setActiveSection(sec.id); readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '9px 16px',
                    background: activeSection === sec.id ? 'rgba(201,165,88,0.1)' : 'none',
                    border: 'none',
                    borderLeft: activeSection === sec.id ? '2px solid #C9A558' : '2px solid transparent',
                    color: activeSection === sec.id ? '#C9A558' : '#7C5F48',
                    fontFamily: activeSection === sec.id ? "'Cinzel', serif" : "'EB Garamond', serif",
                    fontSize: activeSection === sec.id ? 12 : 14,
                    letterSpacing: activeSection === sec.id ? '0.08em' : '0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reader Panel */}
          <div>
            <div
              ref={readerRef}
              className="afia-card"
              style={{ padding: 'clamp(24px,5vw,52px)', minHeight: 500 }}
            >
              {currentSection.content.map((block, i) => (
                <BookBlock key={i} block={block} />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 12 }}>
              <button
                onClick={() => navigate(-1)}
                disabled={currentIndex === 0}
                className="btn-ghost"
                style={{ flex: 1, opacity: currentIndex === 0 ? 0.3 : 1 }}
              >
                ← Previous
              </button>
              <button
                onClick={() => navigate(1)}
                disabled={currentIndex === bookSections.length - 1}
                className="btn-gold"
                style={{ flex: 1, opacity: currentIndex === bookSections.length - 1 ? 0.4 : 1 }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stories & Proverbs by Afia */}
      {stories.length > 0 && (
        <section style={{ padding: '48px 20px 64px', background: 'rgba(201,165,88,0.03)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>From Mama Africa</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px,4vw,32px)', color: '#C9A558', letterSpacing: '0.1em' }}>Stories & Proverbs</h2>
            </div>
            {stories.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        </section>
      )}

      {/* Reviews Section — shown only after reaching the last page */}
      {!hasFinished && (
        <section style={{ padding: '0 20px 64px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ padding: '28px 32px', border: '1px dashed rgba(201,165,88,0.2)', borderRadius: 12 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#7C5F48', letterSpacing: '0.12em' }}>
                Read through to the end to share your thoughts
              </p>
            </div>
          </div>
        </section>
      )}
      {hasFinished && <section style={{ padding: '48px 20px 80px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px,4vw,30px)', color: '#C9A558', letterSpacing: '0.1em', marginBottom: 8 }}>
              Share Your Thoughts
            </h2>
            <p style={{ color: '#7C5F48', fontStyle: 'italic' }}>Your reflections help preserve this tradition for others</p>
          </div>

          {/* Submit form */}
          {!submitted ? (
            <div className="afia-card" style={{ marginBottom: 40 }}>
              <form onSubmit={handleReviewSubmit}>
                <div className="form-field">
                  <label className="field-label">Your Name (optional)</label>
                  <input
                    type="text"
                    placeholder="How would you like to be known?"
                    value={reviewForm.name}
                    onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                    className="afia-input-plain"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Your Rating</label>
                  <StarRating value={reviewForm.rating} onChange={r => { setReviewForm(f => ({ ...f, rating: r })); setReviewError(''); }} />
                </div>
                <div className="form-field">
                  <label className="field-label">Your Comment</label>
                  <textarea
                    placeholder="What did you feel reading this book? What will you carry forward?"
                    value={reviewForm.comment}
                    onChange={e => { setReviewForm(f => ({ ...f, comment: e.target.value })); setReviewError(''); }}
                    className="afia-input-plain"
                    rows={4}
                    style={{ resize: 'vertical', minHeight: 100 }}
                  />
                </div>
                {reviewError && <div className="error-msg" style={{ marginBottom: 16 }}>{reviewError}</div>}
                <button type="submit" className="btn-gold" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          ) : (
            <div className="afia-card" style={{ textAlign: 'center', marginBottom: 40, padding: '32px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
              <p style={{ fontFamily: "'Cinzel', serif", color: '#C9A558', fontSize: 16, letterSpacing: '0.1em' }}>Thank you for your reflection.</p>
              <p style={{ color: '#7C5F48', fontStyle: 'italic', marginTop: 8 }}>Your words help keep the tradition alive.</p>
            </div>
          )}

          {/* Existing reviews */}
          {reviews.length > 0 && (
            <>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 20 }}>
                Reader Reflections
              </div>
              {reviews.map(rev => {
                const d = rev.createdAt?.toDate?.() || (rev.createdAt ? new Date(rev.createdAt) : null);
                return (
                  <div key={rev.id} className="afia-card" style={{ marginBottom: 16, padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: '#EDD9BC' }}>{rev.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <StarRating value={rev.rating} readOnly />
                        {d && <span style={{ fontSize: 12, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', lineHeight: 1.8, fontStyle: 'italic' }}>"{rev.comment}"</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>}
    </div>
  );
}
