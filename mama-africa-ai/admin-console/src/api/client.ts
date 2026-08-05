import axios, { AxiosError } from 'axios';

const TOKEN_KEY = 'mama-africa-token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** An expired or revoked token should drop the session rather than leave a broken console. */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLoginAttempt = error.config?.url?.includes('/api/auth/login');
    if (error.response?.status === 401 && !isLoginAttempt) {
      tokenStore.clear();
      window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

interface ApiError {
  message?: string;
  details?: string[];
}

/** Pulls the backend's ApiError message out of an axios failure. */
export function errorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiError | undefined;
    if (body?.details?.length) {
      return body.details.join(', ');
    }
    if (body?.message) {
      return body.message;
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Cannot reach the API. Is the backend running?';
    }
  }
  return fallback;
}
