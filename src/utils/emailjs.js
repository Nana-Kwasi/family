import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_q45gqai';
const TEMPLATE_FEEDBACK = 'template_8uebrb9';
const PUBLIC_KEY = 'SxleS9-ffCyr5IC-L';
const AFIA_EMAIL = (process.env.REACT_APP_ADMIN_EMAIL || 'Mamaafricaafia@gmail.com').toLowerCase();
const USE_DEV_PROXY = ['localhost', '127.0.0.1'].includes(window.location.hostname);
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
  return sendEmail(TEMPLATE_FEEDBACK, {
    to_email: AFIA_EMAIL,
    from_name: name || 'Anonymous',
    rating_stars: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`,
    message: comment || '(no comment left)',
    book_title: book_title || 'Outdooring (Aba-Dinto)',
  });
}

export function sendAdminOtpEmail({ otp_code, expires_minutes = 5 }) {
  return sendEmail(TEMPLATE_FEEDBACK, {
    to_email: AFIA_EMAIL,
    passcode: otp_code,
    otp_code,
    expires_minutes: String(expires_minutes),
    from_name: 'Mama Africa Platform',
    reply_to: AFIA_EMAIL,
    message: `Your one-time password is ${otp_code}. It expires in ${expires_minutes} minutes.`,
  });
}
