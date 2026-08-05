// Site policies, drafted in the admin console. The sign-up form asks for these by name rather
// than hard-coding a list, so a policy the team adds later appears without a code change.

const API_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');

/** Policies a new account must tick. Empty when the team has published none. */
export async function fetchSignupPolicies() {
  try {
    const res = await fetch(`${API_URL}/api/policies/signup`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    // If this fails the form still works; the backend is the thing that actually enforces
    // consent, and it will reject a signup that is missing one.
    return [];
  }
}

export async function fetchPolicy(kind) {
  const res = await fetch(`${API_URL}/api/policies/${kind}`);
  if (!res.ok) throw new Error('That policy is not available right now.');
  return res.json();
}
