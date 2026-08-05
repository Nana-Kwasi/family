// The signed-in visitor's token. Kept in one place because more than one client needs it:
// the account API, and the Afia chat client — which sends it so she knows who she is talking to.

const TOKEN_KEY = 'mama-africa-customer-token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    // Private browsing with storage disabled: the visitor simply stays signed out.
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore — sign-in still works for this page view */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

/** Authorization header when signed in, an empty object otherwise. */
export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
