// Website accounts, served by the Mama Africa backend. This replaced Firebase Auth: sign-up,
// sign-in and the profile all live in our own PostgreSQL now.

import { authHeader, clearToken, getToken, setToken } from './authToken';

const API_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const res = await fetch(`${API_URL}/api/account${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? authHeader() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 || res.status === 403) {
    // The token is gone, expired or revoked — drop it rather than leave a half-signed-in UI.
    clearToken();
    const error = new Error('Your session has expired. Please sign in again.');
    error.status = res.status;
    throw error;
  }

  if (!res.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const errorBody = await res.json();
      if (errorBody?.details?.length) message = errorBody.details.join(', ');
      else if (errorBody?.message) message = errorBody.message;
    } catch {
      /* keep the generic message */
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return res.status === 204 ? null : res.json();
}

export async function signup({ fullName, email, password, akanName, dayBorn, dob, acceptedPolicies }) {
  const session = await request('/signup', {
    auth: false,
    method: 'POST',
    body: { fullName, email, password, akanName, dayBorn, dob, acceptedPolicies },
  });
  setToken(session.token);
  return session.customer;
}

export async function login({ email, password }) {
  const session = await request('/login', { auth: false, method: 'POST', body: { email, password } });
  setToken(session.token);
  return session.customer;
}

export function logout() {
  clearToken();
}

/** Resolves the current account from a stored token, or null when signed out. */
export async function fetchProfile() {
  if (!getToken()) return null;
  try {
    return await request('/me');
  } catch {
    return null;
  }
}

/** Always resolves the same way, registered or not — the backend will not say which. */
export function forgotPassword(email) {
  return request('/forgot-password', { auth: false, method: 'POST', body: { email } });
}

export function resetPassword(token, newPassword) {
  return request('/reset-password', { auth: false, method: 'POST', body: { token, newPassword } });
}

export function updateProfile(profile) {
  return request('/me', { method: 'PUT', body: profile });
}

export function changePassword(currentPassword, newPassword) {
  return request('/me/password', { method: 'PUT', body: { currentPassword, newPassword } });
}
