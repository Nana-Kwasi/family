import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  collection, addDoc, deleteDoc, updateDoc, doc,
  query, orderBy, onSnapshot, serverTimestamp, getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';

// ── Reusable form fields ──────────────────────────────────────────────────────

function StoryForm({ form, setForm, chapters, setChapters, socialLinks, setSocialLinks, onSubmit, saving, error, success, submitLabel }) {
  const isProverb = form.type === 'proverb';
  function addLinkRow() { setSocialLinks(l => [...l, { label: '', url: '' }]); }
  function removeLinkRow(i) { setSocialLinks(l => l.filter((_, idx) => idx !== i)); }
  function updateLink(i, field, value) {
    setSocialLinks(l => l.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }
  function addChapter() { setChapters(c => [...c, { heading: '', content: '' }]); }
  function removeChapter(i) { setChapters(c => c.filter((_, idx) => idx !== i)); }
  function updateChapter(i, field, value) {
    setChapters(c => c.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-field">
        <label className="field-label">Type</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {['story', 'proverb'].map(t => (
            <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t, contentType: t === 'proverb' ? 'general' : (f.contentType || 'general') }))}
              style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid rgba(201,165,88,0.3)', background: form.type === t ? 'rgba(201,165,88,0.15)' : 'none', color: form.type === t ? '#C9A558' : '#7C5F48', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'capitalize', cursor: 'pointer' }}>
              {t === 'story' ? 'Story' : 'Proverb'}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="field-label">Title (optional)</label>
        <input type="text" placeholder="Give your post a title..." value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="afia-input-plain" />
      </div>

      {!isProverb && (
        <div className="form-field">
          <label className="field-label">Content Type</label>
          <select
            value={form.contentType}
            onChange={e => setForm(f => ({ ...f, contentType: e.target.value }))}
            className="afia-input-plain"
          >
            <option value="general">General</option>
            <option value="cultural-storybook">Cultural Storybook</option>
            <option value="diaspora-learning-edition">Diaspora Learning Edition</option>
          </select>
        </div>
      )}

      <div className="form-field">
        <label className="field-label">Content *</label>
        <textarea
          placeholder={form.type === 'proverb' ? 'Write the proverb and its meaning...' : 'Write your story...'}
          value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          className="afia-input-plain" rows={8} style={{ resize: 'vertical', minHeight: 160 }} required />
      </div>

      {!isProverb && (
        <div className="form-field">
          <label className="field-label">Chapters (optional)</label>
          {chapters.map((ch, i) => (
            <div key={i} style={{ marginBottom: 12, padding: 12, border: '1px solid rgba(201,165,88,0.2)', borderRadius: 8 }}>
              <input
                type="text"
                placeholder={`Chapter ${i + 1} heading`}
                value={ch.heading}
                onChange={e => updateChapter(i, 'heading', e.target.value)}
                className="afia-input-plain"
                style={{ marginBottom: 8 }}
              />
              <textarea
                placeholder="Chapter content..."
                value={ch.content}
                onChange={e => updateChapter(i, 'content', e.target.value)}
                className="afia-input-plain"
                rows={4}
                style={{ resize: 'vertical', minHeight: 90, marginBottom: 8 }}
              />
              {chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChapter(i)}
                  style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  Remove Chapter
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addChapter}
            style={{ background: 'none', border: '1px dashed rgba(201,165,88,0.3)', color: '#9E7D42', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em', padding: '8px 16px', borderRadius: 6, textTransform: 'uppercase', marginTop: 4 }}>
            + Add Chapter
          </button>
        </div>
      )}

      <div className="form-field">
        <label className="field-label">Social Links — "Listen to this more"</label>
        {socialLinks.map((link, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
            <input type="text" placeholder="Label (e.g. YouTube)" value={link.label}
              onChange={e => updateLink(i, 'label', e.target.value)} className="afia-input-plain" style={{ flex: 1 }} />
            <input type="url" placeholder="https://..." value={link.url}
              onChange={e => updateLink(i, 'url', e.target.value)} className="afia-input-plain" style={{ flex: 2 }} />
            {socialLinks.length > 1 && (
              <button type="button" onClick={() => removeLinkRow(i)}
                style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 18, padding: '0 4px' }}>×</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addLinkRow}
          style={{ background: 'none', border: '1px dashed rgba(201,165,88,0.3)', color: '#9E7D42', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em', padding: '8px 16px', borderRadius: 6, textTransform: 'uppercase', marginTop: 4 }}>
          + Add Link
        </button>
      </div>

      {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
      {success && <div className="success-msg" style={{ marginBottom: 16 }}>{success}</div>}
      <button type="submit" className="btn-gold" disabled={saving}>{saving ? 'Saving...' : submitLabel}</button>
    </form>
  );
}

// ── Post card with view / edit / delete ───────────────────────────────────────

function PostCard({ s, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ type: s.type, title: s.title || '', content: s.content || '', contentType: s.contentType || 'general' });
  const [chapters, setChapters] = useState(s.chapters?.length ? s.chapters : [{ heading: '', content: '' }]);
  const [socialLinks, setSocialLinks] = useState(s.socialLinks?.length ? s.socialLinks : [{ label: '', url: '' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const d = s.createdAt?.toDate?.() || (s.createdAt ? new Date(s.createdAt) : null);

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    if (!form.content.trim()) { setError('Content is required.'); return; }
    const validLinks = socialLinks.filter(l => l.label.trim() && l.url.trim());
    setSaving(true);
    try {
      const cleanChapters = chapters.map(c => ({
        heading: c.heading.trim(),
        content: c.content.trim(),
      })).filter(c => c.heading || c.content);
      const finalType = form.type === 'proverb' ? 'general' : (form.contentType || 'general');
      await updateDoc(doc(db, 'stories', s.id), {
        type: form.type,
        title: form.title.trim(),
        content: form.content.trim(),
        contentType: finalType,
        chapters: form.type === 'proverb' ? [] : cleanChapters,
        socialLinks: validLinks,
      });
      setSuccess('Updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="afia-card" style={{ marginBottom: 20 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginRight: 10 }}>{s.type}</span>
          {d && <span style={{ fontSize: 12, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setExpanded(!expanded); setEditing(false); }}
            style={{ background: 'none', border: '1px solid rgba(201,165,88,0.3)', color: '#C9A558', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase' }}>
            {expanded ? 'Collapse' : 'View'}
          </button>
          <button onClick={() => { setEditing(!editing); setExpanded(true); setError(''); setSuccess(''); }}
            style={{ background: editing ? 'rgba(201,165,88,0.15)' : 'none', border: '1px solid rgba(201,165,88,0.3)', color: '#C9A558', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase' }}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button onClick={() => onDelete(s.id)}
            style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase' }}>
            Delete
          </button>
        </div>
      </div>

      {s.title && <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#EDD9BC', marginBottom: 8 }}>{s.title}</h3>}

      {/* Collapsed preview */}
      {!expanded && (
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#BA9D7C', lineHeight: 1.8, fontStyle: s.type === 'proverb' ? 'italic' : 'normal' }}>
          {s.content?.length > 200 ? s.content.slice(0, 200) + '…' : s.content}
        </p>
      )}

      {/* Expanded view */}
      {expanded && !editing && (
        <div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#BA9D7C', lineHeight: 1.8, fontStyle: s.type === 'proverb' ? 'italic' : 'normal', whiteSpace: 'pre-line' }}>
            {s.content}
          </p>
          {s.chapters?.length > 0 && (
            <div style={{ marginTop: 18 }}>
              {s.chapters.map((ch, idx) => (
                <div key={idx} style={{ marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(201,165,88,0.12)' }}>
                  {ch.heading && <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A558', marginBottom: 6 }}>{ch.heading}</h4>}
                  <p style={{ color: '#BA9D7C', whiteSpace: 'pre-line' }}>{ch.content}</p>
                </div>
              ))}
            </div>
          )}
          {s.socialLinks?.length > 0 && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(201,165,88,0.1)' }}>
              <p style={{ fontSize: 12, color: '#7C5F48', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Social Links</p>
              {s.socialLinks.map((l, i) => (
                <div key={i} style={{ fontSize: 13, color: '#BA9D7C', marginBottom: 4 }}>
                  <span style={{ color: '#C9A558' }}>{l.label}</span> — {l.url}
                </div>
              ))}
            </div>
          )}
          {success && <div className="success-msg" style={{ marginTop: 12 }}>{success}</div>}
        </div>
      )}

      {/* Edit form */}
      {expanded && editing && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(201,165,88,0.12)' }}>
          <StoryForm
            form={form} setForm={setForm}
            chapters={chapters} setChapters={setChapters}
            socialLinks={socialLinks} setSocialLinks={setSocialLinks}
            onSubmit={handleUpdate} saving={saving}
            error={error} success={success}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminStoriesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const [storyReviews, setStoryReviews] = useState([]);
  const [readCount, setReadCount] = useState(0);
  const [form, setForm] = useState({ type: 'story', title: '', content: '', contentType: 'general' });
  const [chapters, setChapters] = useState([{ heading: '', content: '' }]);
  const [socialLinks, setSocialLinks] = useState([{ label: '', url: '' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tab, setTab] = useState('write');

  if (!user?.isAdmin) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', marginBottom: 20 }}>Access denied. Admin only.</p>
          <button className="btn-ghost" style={{ width: 'auto' }} onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setStories(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const q = query(collection(db, 'bookReviews'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setBookReviews(snap.docs.map(d => ({ id: d.id, ...d.data(), source: 'Book' }))));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const q = query(collection(db, 'storyReviews'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setStoryReviews(snap.docs.map(d => ({ id: d.id, ...d.data(), source: d.data().storyTitle || 'Story' }))));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getDocs(collection(db, 'bookReads')).then(snap => setReadCount(snap.size)).catch(() => {});
  }, []);

  async function handlePost(e) {
    e.preventDefault();
    setError('');
    if (!form.content.trim()) { setError('Content is required.'); return; }
    const validLinks = socialLinks.filter(l => l.label.trim() && l.url.trim());
    setSaving(true);
    try {
      const cleanChapters = chapters.map(c => ({
        heading: c.heading.trim(),
        content: c.content.trim(),
      })).filter(c => c.heading || c.content);
      const finalType = form.type === 'proverb' ? 'general' : (form.contentType || 'general');
      await addDoc(collection(db, 'stories'), {
        type: form.type, title: form.title.trim(), content: form.content.trim(),
        contentType: finalType,
        chapters: form.type === 'proverb' ? [] : cleanChapters,
        socialLinks: validLinks, authorId: user.id, createdAt: serverTimestamp(),
      });
      setForm({ type: 'story', title: '', content: '', contentType: 'general' });
      setChapters([{ heading: '', content: '' }]);
      setSocialLinks([{ label: '', url: '' }]);
      setSuccess('Posted successfully!');
      setTab('posts');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to post. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this post?')) return;
    await deleteDoc(doc(db, 'stories', id)).catch(() => {});
  }

  // Combined all reviews for stats
  const allReviews = [
    ...bookReviews.map(r => ({ ...r, source: 'Outdooring (Book)' })),
    ...storyReviews,
  ].sort((a, b) => {
    const ta = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
    const tb = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
    return tb - ta;
  });

  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  const tabStyle = active => ({
    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
    padding: '10px 20px', border: 'none', cursor: 'pointer',
    background: active ? 'rgba(201,165,88,0.12)' : 'none',
    color: active ? '#C9A558' : '#7C5F48',
    borderBottom: active ? '2px solid #C9A558' : '2px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <div className="page-wrapper">
      <section style={{ padding: '80px 20px 64px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 4 }}>Stories & Proverbs</h1>
            <p style={{ color: '#7C5F48', fontStyle: 'italic' }}>Publish to the Stories page for all visitors</p>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,165,88,0.15)', marginBottom: 32, flexWrap: 'wrap' }}>
            <button style={tabStyle(tab === 'write')} onClick={() => setTab('write')}>Write New</button>
            <button style={tabStyle(tab === 'posts')} onClick={() => setTab('posts')}>Posts ({stories.length})</button>
            <button style={tabStyle(tab === 'stats')} onClick={() => setTab('stats')}>Feedback & Stats</button>
          </div>

          {/* Write Tab */}
          {tab === 'write' && (
            <div className="afia-card">
              <StoryForm
                form={form} setForm={setForm}
                chapters={chapters} setChapters={setChapters}
                socialLinks={socialLinks} setSocialLinks={setSocialLinks}
                onSubmit={handlePost} saving={saving}
                error={error} success={success}
                submitLabel="Publish to Stories"
              />
            </div>
          )}

          {/* Posts Tab */}
          {tab === 'posts' && (
            <div>
              {stories.length === 0 ? (
                <div className="afia-card" style={{ textAlign: 'center', padding: 48 }}>
                  <p style={{ color: '#BA9D7C' }}>No posts yet. Write your first story or proverb.</p>
                </div>
              ) : (
                stories.map(s => <PostCard key={s.id} s={s} onDelete={handleDelete} />)
              )}
            </div>
          )}

          {/* Stats Tab */}
          {tab === 'stats' && (
            <div>
              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
                {[
                  { label: 'Book Reads', value: readCount },
                  { label: 'Total Reviews', value: allReviews.length },
                  { label: 'Avg Rating', value: avgRating ? `${avgRating} ★` : '—' },
                  { label: 'Book Reviews', value: bookReviews.length },
                  { label: 'Story Reviews', value: storyReviews.length },
                  { label: 'Stories', value: stories.length },
                ].map(card => (
                  <div key={card.label} className="afia-card" style={{ textAlign: 'center', padding: '18px 12px' }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 26, color: '#C9A558', marginBottom: 6 }}>{card.value}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.12em', color: '#7C5F48', textTransform: 'uppercase' }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* All feedback */}
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 16 }}>
                All Feedback
              </div>

              {allReviews.length === 0 ? (
                <div className="afia-card" style={{ textAlign: 'center', padding: 40 }}>
                  <p style={{ color: '#BA9D7C' }}>No feedback yet.</p>
                </div>
              ) : (
                allReviews.map(rev => {
                  const d = rev.createdAt?.toDate?.() || (rev.createdAt ? new Date(rev.createdAt) : null);
                  return (
                    <div key={rev.id} className="afia-card" style={{ marginBottom: 14, padding: '18px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                        <div>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#EDD9BC' }}>{rev.name}</span>
                          <span style={{ fontSize: 11, color: '#7C5F48', marginLeft: 12, fontStyle: 'italic' }}>{rev.source}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ color: '#C9A558', fontSize: 16 }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                          {d && <span style={{ fontSize: 11, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                        </div>
                      </div>
                      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#BA9D7C', lineHeight: 1.75, fontStyle: 'italic' }}>"{rev.comment}"</p>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
