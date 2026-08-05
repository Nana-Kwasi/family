import { Link, useNavigate } from 'react-router';
import { ArrowRight, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { MODULES } from '../modules';
import { useDarkMode } from '../components/useDarkMode';

/**
 * What an admin lands on after signing in. The console covers three unrelated jobs and the
 * old single sidebar mixed them together; this is the fork in the road.
 */
export function ModulesPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useDarkMode();

  const firstName = (user?.fullName || user?.email || '').split(/[\s@]/)[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
              MA
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Mama Africa</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Console</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/login', { replace: true });
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            {firstName ? `Welcome back, ${firstName}` : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose what you would like to work on.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => {
            const Icon = module.icon;

            const card = (
              <>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${module.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium tracking-wide text-slate-400 uppercase dark:text-slate-500">
                  {module.tagline}
                </p>
                <h2 className="mt-1 text-lg font-semibold">{module.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {module.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {module.comingSoon ? 'Coming soon' : 'Open'}
                  {!module.comingSoon && <ArrowRight className="h-4 w-4" />}
                </span>
              </>
            );

            const shared =
              'surface flex flex-col p-6 text-left transition-all min-h-[16rem]';

            return module.comingSoon ? (
              <div key={module.key} className={`${shared} opacity-60`} aria-disabled="true">
                {card}
              </div>
            ) : (
              <Link
                key={module.key}
                to={module.base}
                className={`${shared} hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none`}
              >
                {card}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
