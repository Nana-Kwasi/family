import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_q45gqai';
const TEMPLATE_FEEDBACK = 'template_oa35j64';
const PUBLIC_KEY = 'SxleS9-ffCyr5IC-L';
const AFIA_EMAIL = 'mquachie@gmail.com';

// Used for both book reviews and story/proverb feedback
export function notifyAfiaBookFeedback({ name, rating, comment, book_title }) {
  return emailjs.send(SERVICE_ID, TEMPLATE_FEEDBACK, {
    to_email: AFIA_EMAIL,
    from_name: name || 'Anonymous',
    rating_stars: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`,
    message: comment || '(no comment left)',
    book_title: book_title || 'Outdooring (Aba-Dinto)',
  }, PUBLIC_KEY);
}
