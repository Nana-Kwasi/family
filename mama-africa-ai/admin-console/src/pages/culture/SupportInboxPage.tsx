import { useState } from 'react';
import { Check, Mail, MailWarning, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useDeleteSupportMessage,
  useResolveSupportMessage,
  useSupportMessages,
} from '../../api/culture-hooks';
import type { SupportStatus } from '../../api/culture-types';
import { PageHeader } from '../../components/AppLayout';
import { Alert, Badge, Button, Card, EmptyState, Pagination, Select, Spinner } from '../../components/ui';

const TONE: Record<SupportStatus, string> = { NEW: 'amber', HANDLED: 'green', SPAM: 'red' };

export function SupportInboxPage() {
  const [status, setStatus] = useState<'' | SupportStatus>('NEW');
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');

  const { data, isLoading } = useSupportMessages(status || undefined, page);
  const resolve = useResolveSupportMessage();
  const remove = useDeleteSupportMessage();

  const act = async (id: number, next: SupportStatus) => {
    setError('');
    try {
      await resolve.mutateAsync({ id, status: next });
    } catch (err) {
      setError(errorMessage(err, 'Could not update the message'));
    }
  };

  return (
    <>
      <PageHeader
        title="Support inbox"
        description="Questions sent from the website's support button. Rate-limited to one a minute per sender."
      />

      {error && <Alert tone="error">{error}</Alert>}

      <Card className="mb-4">
        <div className="p-4 sm:max-w-xs">
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as '' | SupportStatus);
              setPage(0);
            }}
          >
            <option value="NEW">Needs a reply</option>
            <option value="HANDLED">Handled</option>
            <option value="SPAM">Spam</option>
            <option value="">Everything</option>
          </Select>
        </div>
      </Card>

      <Card>
        {isLoading && <Spinner label="Loading messages" />}

        {!isLoading && data && data.content.length === 0 && (
          <EmptyState
            title="Nothing here"
            description={status === 'NEW' ? 'No messages waiting for a reply.' : 'No messages match this filter.'}
          />
        )}

        {!isLoading && data && data.content.length > 0 && (
          <>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.content.map((message) => (
                <li key={message.id} className="px-5 py-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-medium">{message.name ?? 'Anonymous'}</span>
                    <a
                      href={`mailto:${message.email}?subject=Re:%20your%20Mama%20Africa%20question`}
                      className="text-sm text-brand-600 hover:underline dark:text-brand-400"
                    >
                      {message.email}
                    </a>
                    <Badge tone={TONE[message.status]}>{message.status}</Badge>
                    {/* Says plainly whether the notification actually left the building. */}
                    {message.emailed ? (
                      <span title="A notification email was sent" className="text-slate-400">
                        <Mail className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span title="No notification sent — email is not configured" className="text-amber-500">
                        <MailWarning className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <span className="ml-auto text-xs text-slate-400">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                    {message.message}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      icon={<Check className="h-4 w-4" />}
                      onClick={() => act(message.id, 'HANDLED')}
                    >
                      Mark handled
                    </Button>
                    <Button variant="ghost" onClick={() => act(message.id, 'SPAM')}>
                      Spam
                    </Button>
                    <Button
                      variant="ghost"
                      icon={<Trash2 className="h-4 w-4" />}
                      onClick={async () => {
                        setError('');
                        try {
                          await remove.mutateAsync(message.id);
                        } catch (err) {
                          setError(errorMessage(err, 'Could not delete'));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              page={data.number}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              onChange={setPage}
            />
          </>
        )}
      </Card>
    </>
  );
}
