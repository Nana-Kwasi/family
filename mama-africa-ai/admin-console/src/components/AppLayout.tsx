import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import clsx from 'clsx';
import { Grid2x2, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Footer } from './Footer';
import { useDarkMode } from './useDarkMode';
import { ACCOUNT_NAV, MODULES, moduleForPath } from '../modules';

export function AppLayout() {
  const { user, isSuperAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useDarkMode();

  // The account pages sit outside every module; show the AI sidebar there so the console
  // never renders a chromeless page.
  const activeModule = moduleForPath(location.pathname) ?? MODULES[0];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const items = [...activeModule.nav, ...ACCOUNT_NAV].filter(
    (item) => !item.superAdminOnly || isSuperAdmin,
  );

  const ModuleIcon = activeModule.icon;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex dark:border-slate-800 dark:bg-slate-900">
        <div className="px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className={clsx('flex h-9 w-9 items-center justify-center rounded-lg', activeModule.accent)}>
              <ModuleIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">{activeModule.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Admin Console</p>
            </div>
          </div>

          <NavLink
            to="/"
            className="mt-4 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Grid2x2 className="h-3.5 w-3.5" />
            All modules
          </NavLink>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="px-2 pb-2">
            <p className="truncate text-sm font-medium">{user?.fullName || user?.email}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setDark(!dark)}
              className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Compact nav for narrow screens — the sidebar is hidden below md. */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-slate-200 bg-white py-2 md:hidden dark:border-slate-800 dark:bg-slate-900">
        <NavLink to="/" end aria-label="All modules" className="rounded-lg p-2 text-slate-500">
          <Grid2x2 className="h-5 w-5" />
        </NavLink>
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            className={({ isActive }) =>
              clsx('rounded-lg p-2', isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500')
            }
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>

      <main className="min-w-0 flex-1 pb-20 md:pb-0">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
