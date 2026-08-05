import { useEffect, useState } from 'react';

const THEME_KEY = 'mama-africa-theme';

/**
 * Theme preference, remembered across sessions and falling back to the operating system.
 * Shared by the layout and the module launcher so the toggle behaves the same in both.
 */
export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark] as const;
}
