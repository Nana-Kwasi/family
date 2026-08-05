// Controls how often the Spin-the-Wheel pop-up appears.
// New device (no record) → show. Returning device → show once per 24h.
const KEY = 'ma_spin_last_shown';
const DAY = 24 * 60 * 60 * 1000;

export function shouldShowSpin() {
  try {
    const v = window.localStorage.getItem(KEY);
    if (!v) return true;
    return Date.now() - Number(v) > DAY;
  } catch {
    return true;
  }
}

export function markSpinShown() {
  try {
    window.localStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}
