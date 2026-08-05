import { useState } from 'react';
import { Check, EyeOff, Star, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useDeleteDiasporaStory,
  useDeleteReview,
  useDiasporaStories,
  useModerateDiasporaStory,
  useModerateReview,
  useReviews,
} from '../../api/culture-hooks';
import {
  SUBJECT_LABELS,
  type ModerationStatus,
  type ReviewSubject,
} from '../../api/culture-types';
import { PageHeader } from '../../components/AppLayout';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Modal,
  Pagination,
  Select,
  Spinner,
  Table,
} from '../../components/ui';

const STATUS_TONE: Record<ModerationStatus, string> = {
  APPROVED: 'green',
  PENDING: 'amber',
  REJECTED: 'red',
};

/**
 * Everything visitors send in. Submissions go live on arrival — this is where they are taken
 * down, not where they are let through.
 */
export function SubmissionsPage() {
  const [tab, setTab] = useState<'diaspora' | 'reviews'>('diaspora');

  return (
    <>
      <PageHeader
        title="Submissions"
        description="Diaspora stories and ratings sent in by visitors. They publish immediately; take one down here if it needs removing."
      />

      <div className="mb-4 flex gap-2">
        {(
          [
            ['diaspora', 'Diaspora stories'],
            ['reviews', 'Ratings'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === value
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'diaspora' ? <DiasporaTab /> : <ReviewsTab />}
    </>
  );
}

function DiasporaTab() {
  const [status, setStatus] = useState<'' | ModerationStatus>('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; name: string } | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data, isLoading } = useDiasporaStories(status || undefined, page);
  const moderate = useModerateDiasporaStory();
  const remove = useDeleteDiasporaStory();

  const act = async (id: number, next: ModerationStatus) => {
    setError('');
    try {
      await moderate.mutateAsync({ id, status: next });
    } catch (err) {
      setError(errorMessage(err, 'Could not update the submission'));
    }
  };

  return (
    <>
      {error && <Alert tone="error">{error}</Alert>}

      <Card className="mb-4">
        <div className="p-4 sm:max-w-xs">
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as '' | ModerationStatus);
              setPage(0);
            }}
          >
            <option value="">All submissions</option>
            <option value="APPROVED">Live on the site</option>
            <option value="REJECTED">Taken down</option>
            <option value="PENDING">Awaiting review</option>
          </Select>
        </div>
      </Card>

      <Card>
        {isLoading && <Spinner label="Loading submissions" />}
        {!isLoading && data && data.content.length === 0 && (
          <EmptyState title="No submissions" description="Stories shared on the diaspora page appear here." />
        )}
        {!isLoading && data && data.content.length > 0 && (
          <>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.content.map((item) => {
                const isOpen = expanded === item.id;
                const preview = item.story.length > 220 ? `${item.story.slice(0, 220)}…` : item.story;
                return (
                  <li key={item.id} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.country && (
                        <span className="text-sm text-slate-500 dark:text-slate-400">{item.country}</span>
                      )}
                      {item.akanName && <Badge tone="blue">{item.akanName}</Badge>}
                      <Badge tone={STATUS_TONE[item.status]}>{item.status}</Badge>
                      <span className="ml-auto text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                      {isOpen ? item.story : preview}
                    </p>
                    {item.story.length > 220 && (
                      <button
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                        className="mt-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
                      >
                        {isOpen ? 'Show less' : 'Read all'}
                      </button>
                    )}

                    <div className="mt-3 flex gap-2">
                      {item.status !== 'APPROVED' && (
                        <Button variant="secondary" icon={<Check className="h-4 w-4" />} onClick={() => act(item.id, 'APPROVED')}>
                          Put back
                        </Button>
                      )}
                      {item.status !== 'REJECTED' && (
                        <Button variant="secondary" icon={<EyeOff className="h-4 w-4" />} onClick={() => act(item.id, 'REJECTED')}>
                          Take down
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        icon={<Trash2 className="h-4 w-4" />}
                        onClick={() => setConfirmDelete({ id: item.id, name: item.name })}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                );
              })}
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

      <Modal
        open={confirmDelete !== null}
        title="Delete submission"
        onClose={() => setConfirmDelete(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={remove.isPending}
              onClick={async () => {
                if (!confirmDelete) return;
                try {
                  await remove.mutateAsync(confirmDelete.id);
                } catch (err) {
                  setError(errorMessage(err, 'Could not delete'));
                }
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Permanently delete the story from <strong>{confirmDelete?.name}</strong>? Taking it down hides
          it and keeps the record; deleting cannot be undone.
        </p>
      </Modal>
    </>
  );
}

function ReviewsTab() {
  const [subject, setSubject] = useState<'' | ReviewSubject>('');
  const [status, setStatus] = useState<'' | ModerationStatus>('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');

  const { data, isLoading } = useReviews(subject || undefined, status || undefined, page);
  const moderate = useModerateReview();
  const remove = useDeleteReview();

  const act = async (id: number, next: ModerationStatus) => {
    setError('');
    try {
      await moderate.mutateAsync({ id, status: next });
    } catch (err) {
      setError(errorMessage(err, 'Could not update the rating'));
    }
  };

  return (
    <>
      {error && <Alert tone="error">{error}</Alert>}

      <Card className="mb-4">
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:max-w-lg">
          <Select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value as '' | ReviewSubject);
              setPage(0);
            }}
          >
            <option value="">Everything rated</option>
            {(Object.keys(SUBJECT_LABELS) as ReviewSubject[]).map((value) => (
              <option key={value} value={value}>
                {SUBJECT_LABELS[value]}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as '' | ModerationStatus);
              setPage(0);
            }}
          >
            <option value="">All statuses</option>
            <option value="APPROVED">Showing</option>
            <option value="REJECTED">Hidden</option>
            <option value="PENDING">Awaiting review</option>
          </Select>
        </div>
      </Card>

      <Card>
        {isLoading && <Spinner label="Loading ratings" />}
        {!isLoading && data && data.content.length === 0 && (
          <EmptyState title="No ratings" description="Stars left on stories and the e-book appear here." />
        )}
        {!isLoading && data && data.content.length > 0 && (
          <>
            <Table headers={['Rating', 'About', 'From', 'Comment', 'Status', '']}>
              {data.content.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{review.subjectTitle || SUBJECT_LABELS[review.subject]}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {SUBJECT_LABELS[review.subject]}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{review.name}</td>
                  <td className="max-w-sm px-4 py-3">
                    <p className="truncate text-sm text-slate-600 dark:text-slate-300" title={review.comment ?? ''}>
                      {review.comment || <em className="text-slate-400">No comment</em>}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={STATUS_TONE[review.status]}>{review.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        title={review.status === 'APPROVED' ? 'Hide' : 'Show'}
                        onClick={() => act(review.id, review.status === 'APPROVED' ? 'REJECTED' : 'APPROVED')}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                      >
                        {review.status === 'APPROVED' ? <EyeOff className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </button>
                      <button
                        title="Delete"
                        onClick={async () => {
                          setError('');
                          try {
                            await remove.mutateAsync(review.id);
                          } catch (err) {
                            setError(errorMessage(err, 'Could not delete'));
                          }
                        }}
                        className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
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
