import { Link } from 'react-router';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  LineChart,
  MessagesSquare,
  Settings,
  Upload,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useDashboard } from '../api/hooks';
import { errorMessage } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PageHeader } from '../components/AppLayout';
import { Alert, Badge, Card, EmptyState, Spinner } from '../components/ui';
import { formatDate } from '../components/format';

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-semibold tabular-nums">{value.toLocaleString()}</p>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Card>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="surface group flex items-start gap-3 p-4 transition-colors hover:border-brand-400 dark:hover:border-brand-500/50"
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-brand-500/10 dark:group-hover:text-brand-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </Link>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className="truncate text-sm font-medium">{children}</span>
    </div>
  );
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <Spinner label="Loading dashboard" />;
  if (error || !data) return <Alert tone="error">{errorMessage(error)}</Alert>;

  const { totals, model, recentConversations } = data;
  const firstName = user?.fullName?.split(' ')[0] ?? 'there';

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${firstName}`}
        description="Activity and model status at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Conversations" value={totals.conversations} icon={MessagesSquare} />
        <StatCard label="Messages" value={totals.messages} icon={MessagesSquare} />
        <StatCard label="Knowledge documents" value={totals.knowledgeDocuments} icon={BookOpen} />
        <StatCard label="Indexed documents" value={totals.indexedDocuments} icon={CheckCircle2} />
      </div>

      {totals.failedDocuments > 0 && (
        <div className="mt-4">
          <Alert tone="error">
            {totals.failedDocuments} document{totals.failedDocuments === 1 ? '' : 's'} failed to index.{' '}
            <Link to="/knowledge" className="font-medium underline">
              Review them
            </Link>
            .
          </Alert>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          to="/knowledge"
          icon={Upload}
          title="Add knowledge"
          description="Upload a PDF, DOCX or Markdown file"
        />
        <QuickAction
          to="/conversations"
          icon={MessagesSquare}
          title="Read conversations"
          description="See what visitors are asking"
        />
        <QuickAction
          to="/analytics"
          icon={LineChart}
          title="View analytics"
          description="Usage, languages and response times"
        />
        <QuickAction
          to="/settings"
          icon={Settings}
          title="Tune the AI"
          description="Model, prompt and retrieval settings"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <h2 className="mb-1 text-sm font-semibold">Model</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <DetailRow label="Status">
              {model.reachable ? (
                <Badge tone="green">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Reachable
                </Badge>
              ) : (
                <Badge tone="red">
                  <XCircle className="mr-1 h-3 w-3" /> Unreachable
                </Badge>
              )}
            </DetailRow>
            <DetailRow label="Provider">{model.provider}</DetailRow>
            <DetailRow label="Model">{model.model}</DetailRow>
            <DetailRow label="Endpoint">
              <span className="font-mono text-xs">{model.baseUrl}</span>
            </DetailRow>
            <DetailRow label="Embeddings">{model.embeddingProvider}</DetailRow>
            <DetailRow label="Knowledge retrieval">
              {model.ragEnabled ? <Badge tone="green">On</Badge> : <Badge>Off</Badge>}
            </DetailRow>
          </div>

          {!model.reachable && (
            <div className="mt-3">
              <Alert tone="error">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Chat requests will fail until the model server responds.
                </span>
              </Alert>
            </div>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-sm font-semibold">Recent conversations</h2>
            <Link
              to="/conversations"
              className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              View all
            </Link>
          </div>

          {recentConversations.length === 0 ? (
            <EmptyState
              title="No conversations yet"
              description="They appear here once the website starts calling /api/chat."
            />
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentConversations.map((conversation) => (
                <li key={conversation.id}>
                  <Link
                    to={`/conversations?open=${conversation.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {conversation.title ?? 'Untitled'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(conversation.updatedAt)}
                      </span>
                    </span>
                    <Badge tone="blue">{conversation.language}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
