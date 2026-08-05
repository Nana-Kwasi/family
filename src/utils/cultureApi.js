// The website's client for the Mama Africa Culture API. Replaces the direct Firestore calls
// these pages used to make — stories, the diaspora wall, ratings and newsletter sign-ups all
// live in PostgreSQL now, behind the same backend that serves the shop and Afia.

const API_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API_KEY = process.env.REACT_APP_AI_API_KEY || '';

function headers() {
  return API_KEY
    ? { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY }
    : { 'Content-Type': 'application/json' };
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}/api/culture${path}`, { headers: headers(), ...options });
  if (!res.ok) {
    // The backend returns an ApiError body; surface its message so form errors are useful
    // rather than a bare status code.
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.details?.length) message = body.details.join(', ');
      else if (body?.message) message = body.message;
    } catch {
      /* a non-JSON error body is not worth reporting over the status */
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return res.status === 204 ? null : res.json();
}

/**
 * Firestore handed components a `createdAt` with a `.toDate()` method and the pages call it.
 * The API sends an ISO string, so give it the same shape rather than editing every caller.
 */
function withTimestamp(record) {
  if (!record?.createdAt) return record;
  const date = new Date(record.createdAt);
  return { ...record, createdAt: { toDate: () => date, toMillis: () => date.getTime() } };
}

// --- Stories ----------------------------------------------------------------

export async function fetchStories() {
  const stories = await request('/stories');
  return stories.map((story) => withTimestamp({
    ...story,
    // The site's components were written against the old Firestore field names.
    type: story.kind === 'PROVERB' ? 'proverb' : 'story',
    contentType: CONTENT_TYPE_TO_SLUG[story.contentType] || 'general',
  }));
}

const CONTENT_TYPE_TO_SLUG = {
  GENERAL: 'general',
  CULTURAL_STORYBOOK: 'cultural-storybook',
  DIASPORA_LEARNING_EDITION: 'diaspora-learning-edition',
};

// --- Diaspora wall ----------------------------------------------------------

export async function fetchDiasporaStories() {
  const stories = await request('/diaspora-stories');
  return stories.map(withTimestamp);
}

export function submitDiasporaStory({ name, country, akanName, story }) {
  return request('/diaspora-stories', {
    method: 'POST',
    body: JSON.stringify({ name, country, akanName, story }),
  });
}

// --- Ratings ----------------------------------------------------------------

/** @param subject one of STORY, BOOK, DIASPORA */
export async function fetchReviews(subject, subjectId) {
  const query = subjectId ? `?subject=${subject}&subjectId=${subjectId}` : `?subject=${subject}`;
  const reviews = await request(`/reviews${query}`);
  return reviews.map(withTimestamp);
}

export function submitReview({ subject, subjectId, subjectTitle, name, rating, comment }) {
  return request('/reviews', {
    method: 'POST',
    body: JSON.stringify({ subject, subjectId, subjectTitle, name, rating, comment }),
  });
}

// --- Newsletter and readership ---------------------------------------------

export function subscribe({ email, akanName, dayBorn, dob, source }) {
  return request('/subscribers', {
    method: 'POST',
    body: JSON.stringify({ email, akanName, dayBorn, dob, source }),
  });
}

/** Best-effort: a failed count must never interrupt someone opening the book. */
export function recordBookRead() {
  return request('/book-reads', { method: 'POST' }).catch(() => {});
}
