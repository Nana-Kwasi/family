const enc = new TextEncoder();

function normalizeAnswer(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(normalizeAnswer(s)));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const EXPECTED_DIGEST_HEX = [
  '747e116f8f2e5a38d5b6654a1740f25e1f2187955f0f0fe4ffc8b8b184e611e2',
  '5fd0589267a0e9ecbbe3bcfaa6a8ff877c66cf5988f610e2406d848650e5f0f8',
  'c2a1d67a04adca235f86c78fe679c8c655a18ea55382ab265261b01906edb8b9',
];

export const ADMIN_SECURITY_QUESTIONS = [
  'What is the hometown of Mama Africa?',
  "What is Mama Africa's father's full name?",
  'Who developed this system?',
];

export async function verifyAdminSecurityAnswers(a1, a2, a3) {
  const [h1, h2, h3] = await Promise.all([
    sha256Hex(a1),
    sha256Hex(a2),
    sha256Hex(a3),
  ]);
  return h1 === EXPECTED_DIGEST_HEX[0] && h2 === EXPECTED_DIGEST_HEX[1] && h3 === EXPECTED_DIGEST_HEX[2];
}
