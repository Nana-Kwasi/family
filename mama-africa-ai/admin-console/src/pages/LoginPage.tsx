import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import {
  BookOpen,
  ChevronDown,
  HelpCircle,
  LineChart,
  LogIn,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { errorMessage } from '../api/client';
import { Alert, Button, Field, Input, Modal, Spinner } from '../components/ui';
import { LoginFooter } from '../components/Footer';
import { FAQ_ENTRIES } from '../components/Faq';
import backgroundImage from '../images/back.jpg';

const HIGHLIGHTS = [
  { icon: BookOpen, text: 'Curate the knowledge the assistant answers from' },
  { icon: MessagesSquare, text: 'Read every conversation the website has had' },
  { icon: LineChart, text: 'Track usage, languages and response times' },
];

export function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  if (loading) return <Spinner label="Checking your session" />;
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      setError(errorMessage(e, 'Invalid email or password'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // One viewport, no page scroll: the sign-in card is centred and the footer is pinned.
    // `dark` scopes the shared components to their dark styling whatever theme the console is in.
    <div className="dark fixed inset-0 overflow-hidden bg-slate-950 text-slate-100">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-slate-950/75" />

      <div className="relative flex h-full flex-col">
        <main className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-8">
          <div className="w-full max-w-sm">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-lg shadow-brand-500/25">
                MA
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Mama Africa Admin Console</h1>
              {/* <p className="mt-1.5 text-sm text-slate-300">Admin Console</p> */}
            </div>

            <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <Alert tone="error">{error}</Alert>}

                <Field label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    placeholder="you@mamaafrica.ai"
                    required
                    autoFocus
                  />
                </Field>

                <Field label="Password">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </Field>

                <Button
                  type="submit"
                  loading={submitting}
                  icon={<LogIn className="h-4 w-4" />}
                  className="w-full"
                >
                  Sign in
                </Button>
              </form>
            </div>

            <ul className="mt-7 space-y-2">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => setFaqOpen(true)}
                className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-brand-400"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Common questions
              </button>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Authorised administrators only
              </span>
            </div>
          </div>
        </main>

        <LoginFooter />
      </div>

      <Modal open={faqOpen} title="Common questions" onClose={() => setFaqOpen(false)} wide>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          How the assistant works, and what to check when it misbehaves.
        </p>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {FAQ_ENTRIES.map((entry) => (
            <details key={entry.question} className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:content-none">
                {entry.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 pr-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
      </Modal>
    </div>
  );
}
