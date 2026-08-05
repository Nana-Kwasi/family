import { BookText, HeartPulse, ExternalLink } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const VERSION = '1.0.0';

const LINKS = [
  { label: 'API reference', href: `${API_BASE_URL}/swagger-ui.html`, icon: BookText },
  { label: 'Service health', href: `${API_BASE_URL}/actuator/health`, icon: HeartPulse },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 pt-6 pb-8 dark:border-slate-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-[10px] font-bold text-white">
            MA
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mama Africa AI · Admin Console
            <span className="mx-1.5 text-slate-300 dark:text-slate-700">|</span>
            v{VERSION}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          ))}
        </nav>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} Mama Africa Official. The assistant answers from the documents
        you curate here — review them regularly to keep it accurate.
      </p>
    </footer>
  );
}

/**
 * Compact single-line footer for the sign-in screen, which is one fixed viewport —
 * the full footer's stacked layout would push the card off-centre.
 */
export function LoginFooter() {
  return (
    <footer className="shrink-0 border-t border-white/10 bg-slate-950/40 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-xs sm:flex-row sm:justify-between">
        <p className="text-slate-500">
          © {new Date().getFullYear()} Mama Africa Official
          <span className="mx-1.5 text-slate-700">|</span>
          Admin Console v{VERSION}
        </p>
        <nav className="flex items-center gap-5">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-brand-400"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
