import { useState } from 'react';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { useAnalytics } from '../api/hooks';
import { errorMessage } from '../api/client';
import type { Analytics } from '../api/types';
import { PageHeader } from '../components/AppLayout';
import { Alert, Card, Spinner, Table } from '../components/ui';
import { BarList, ChartCard, LineChart, StatTile } from '../components/charts';

const WINDOWS = [7, 30, 90] as const;

/** Reserved status colours, paired with an icon and the visible label — never colour alone. */
const STATUS_STYLES: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  INDEXED: { color: 'var(--status-good)', icon: CheckCircle2 },
  INDEXING: { color: 'var(--status-warning)', icon: Loader2 },
  PENDING: { color: 'var(--status-serious)', icon: Clock },
  FAILED: { color: 'var(--status-critical)', icon: AlertTriangle },
};

export function AnalyticsPage() {
  const [days, setDays] = useState<number>(30);
  const [showTable, setShowTable] = useState(false);
  const { data, isLoading, error } = useAnalytics(days);

  return (
    <>
      <PageHeader
        title="Analytics"
        description="How the assistant is being used, and how well it is keeping up."
        actions={
          <div
            className="inline-flex rounded-lg border border-slate-300 p-0.5 dark:border-slate-700"
            role="group"
            aria-label="Reporting window"
          >
            {WINDOWS.map((option) => (
              <button
                key={option}
                onClick={() => setDays(option)}
                aria-pressed={days === option}
                className={clsx(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  days === option
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                )}
              >
                {option} days
              </button>
            ))}
          </div>
        }
      />

      {isLoading ? (
        <Spinner label="Loading analytics" />
      ) : error || !data ? (
        <Alert tone="error">{errorMessage(error)}</Alert>
      ) : (
        <AnalyticsContent data={data} showTable={showTable} onToggleTable={() => setShowTable(!showTable)} />
      )}
    </>
  );
}

function AnalyticsContent({
  data,
  showTable,
  onToggleTable,
}: {
  data: Analytics;
  showTable: boolean;
  onToggleTable: () => void;
}) {
  const points = data.activity.map((day) => ({
    label: new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    values: [day.conversations, day.messages],
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Conversations" value={data.totals.conversations.toLocaleString()} />
        <StatTile label="Messages" value={data.totals.messages.toLocaleString()} />
        <StatTile
          label="Messages per conversation"
          value={data.totals.messagesPerConversation.toFixed(1)}
        />
        <StatTile
          label="Median response"
          value={data.latency.sampleCount === 0 ? '—' : `${formatMs(data.latency.p50Ms)}`}
          hint={data.latency.sampleCount === 0 ? 'No answers recorded' : `${data.latency.sampleCount} answers`}
        />
      </div>

      <ChartCard
        title="Daily activity"
        description={`${data.from} to ${data.to}`}
        action={
          <button
            onClick={onToggleTable}
            className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            {showTable ? 'Show chart' : 'Show data table'}
          </button>
        }
      >
        {showTable ? (
          <div className="max-h-96 overflow-y-auto">
            <Table headers={['Date', 'Conversations', 'Messages']}>
              {data.activity.map((day) => (
                <tr key={day.date}>
                  <td className="px-4 py-2">{day.date}</td>
                  <td className="px-4 py-2 tabular-nums">{day.conversations}</td>
                  <td className="px-4 py-2 tabular-nums">{day.messages}</td>
                </tr>
              ))}
            </Table>
          </div>
        ) : (
          <LineChart points={points} seriesNames={['Conversations', 'Messages']} />
        )}
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Response time" description="Time the model took to answer, in the window.">
          {data.latency.sampleCount === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No answers recorded in this window.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Average" value={formatMs(data.latency.averageMs)} />
              <StatTile label="Median (p50)" value={formatMs(data.latency.p50Ms)} />
              <StatTile
                label="95th percentile"
                value={formatMs(data.latency.p95Ms)}
                hint="1 in 20 answers is slower"
              />
              <StatTile label="Slowest" value={formatMs(data.latency.slowestMs)} />
            </div>
          )}
        </ChartCard>

        <ChartCard title="Languages" description="Conversations by detected language.">
          <BarList
            data={data.languages.map((slice) => ({ label: titleCase(slice.label), count: slice.count }))}
            emptyLabel="No conversations in this window"
          />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Documents by status" description="Across the whole knowledge base.">
          <ul className="viz space-y-2">
            {data.documentsByStatus.length === 0 && (
              <li className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                No documents uploaded
              </li>
            )}
            {data.documentsByStatus.map((slice) => {
              const style = STATUS_STYLES[slice.label];
              const Icon = style?.icon ?? CheckCircle2;
              return (
                <li key={slice.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm">
                    <Icon className="h-4 w-4" style={{ color: style?.color }} aria-hidden />
                    {titleCase(slice.label)}
                  </span>
                  <span className="text-sm font-medium tabular-nums">{slice.count}</span>
                </li>
              );
            })}
          </ul>
        </ChartCard>

        <ChartCard title="Documents by category" description="Where the knowledge sits.">
          <BarList data={data.documentsByCategory} emptyLabel="No documents uploaded" />
        </ChartCard>

        <ChartCard title="Models used" description="Which model answered, in the window.">
          <BarList data={data.models} emptyLabel="No answers in this window" />
        </ChartCard>
      </div>

      <Card className="p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Percentiles are nearest-rank over every answer recorded in the window. Days with no
          activity are shown as zero rather than skipped, so the chart is not misread as busier
          than it was.
        </p>
      </Card>
    </div>
  );
}

function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`;
}

function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
