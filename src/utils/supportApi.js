// The support form now posts to our backend instead of calling EmailJS from the browser.
//
// The old path shipped an EmailJS key to every visitor and enforced its "one message per
// window" rule in client-side code, so anyone willing to open devtools could send without
// limit — which is exactly what was happening. The limit now lives on the server.

const API_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export class SupportRateLimitError extends Error {
  constructor(message, retryAfterSeconds) {
    super(message);
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export async function sendSupportMessage({ name, email, message }) {
  const res = await fetch(`${API_URL}/api/support/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  if (res.status === 429) {
    // The backend explains how long to wait; show its words rather than inventing our own.
    const retryAfter = Number(res.headers.get('Retry-After')) || 60;
    let text = 'Please wait a moment before sending another message.';
    try {
      const body = await res.json();
      if (body?.message) text = body.message;
    } catch {
      /* keep the default */
    }
    throw new SupportRateLimitError(text, retryAfter);
  }

  if (!res.ok) {
    let text = 'Could not send your message. Please try again.';
    try {
      const body = await res.json();
      if (body?.details?.length) text = body.details.join(', ');
      else if (body?.message) text = body.message;
    } catch {
      /* keep the default */
    }
    throw new Error(text);
  }

  return res.json();
}
