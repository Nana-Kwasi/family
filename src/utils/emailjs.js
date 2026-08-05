import emailjs from '@emailjs/browser';

// Book-review notifications only. The support form moved to the backend, where its rate limit
// cannot be bypassed — see src/utils/supportApi.js.
//
// These identifiers used to be committed here. An EmailJS public key is meant to be visible in
// the browser, but hard-coding it meant the account could not be rotated without a code change,
// and it made the abuse easy to automate against.

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
// Messages template (support questions + book feedback) — renders {{from_name}},
// {{reply_to}}, {{message}}, {{subject}}.
const TEMPLATE_FEEDBACK = process.env.REACT_APP_EMAILJS_FEEDBACK_TEMPLATE || '';
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
const AFIA_EMAIL = (process.env.REACT_APP_ADMIN_EMAIL || 'Mamaafricaafia@gmail.com').toLowerCase();
// Send straight from the browser SDK (works with the public key once Strict Mode
// is off in the EmailJS account). The old localhost server-proxy is opt-in only,
// since a server-side call needs the private key under Strict Mode.
const USE_DEV_PROXY = process.env.REACT_APP_EMAILJS_USE_PROXY === 'true';
const RETRY_DELAYS_MS = [500, 1500, 3000];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldRetry(status) {
  return [502, 503, 504].includes(Number(status));
}

function errorStatus(err) {
  return Number(err?.status ?? err?.statusCode);
}

async function sendViaDevProxy(templateId, templateParams) {
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    const res = await fetch('/api/emailjs/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: templateId,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
    if (res.ok) return { status: res.status, text: 'OK' };

    const text = await res.text();
    if (attempt < RETRY_DELAYS_MS.length && shouldRetry(res.status)) {
      await sleep(RETRY_DELAYS_MS[attempt]);
      continue;
    }

    const err = new Error(text || 'Email send failed');
    err.status = res.status;
    err.text = text;
    throw err;
  }
  return { status: 200, text: 'OK' };
}

async function sendEmailJsBrowserWithRetry(templateId, templateParams) {
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      return await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    } catch (err) {
      const status = errorStatus(err);
      if (attempt < RETRY_DELAYS_MS.length && shouldRetry(status)) {
        await sleep(RETRY_DELAYS_MS[attempt]);
        continue;
      }
      const wrapped = new Error(err?.text || err?.message || 'Email send failed');
      wrapped.status = status || err?.status;
      throw wrapped;
    }
  }
}

function sendEmail(templateId, templateParams) {
  if (USE_DEV_PROXY) return sendViaDevProxy(templateId, templateParams);
  return sendEmailJsBrowserWithRetry(templateId, templateParams);
}

export function notifyAfiaBookFeedback({ name, rating, comment, book_title }) {
  const stars = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`;
  return sendEmail(TEMPLATE_FEEDBACK, {
    to_email: AFIA_EMAIL,
    subject: `New book review — ${rating}/5`,
    from_name: name || 'Anonymous',
    reply_to: '',
    message: `Book: ${book_title || 'Outdooring (Aba-Dinto)'}\nRating: ${stars}\n\n${comment || '(no comment left)'}`,
    rating_stars: stars,
    book_title: book_title || 'Outdooring (Aba-Dinto)',
  });
}


