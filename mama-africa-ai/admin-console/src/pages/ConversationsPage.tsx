import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useConversation, useConversations, useDeleteConversation } from '../api/hooks';
import { errorMessage } from '../api/client';
import type { ConversationSummary, Language } from '../api/types';
import { PageHeader } from '../components/AppLayout';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Pagination,
  Select,
  Spinner,
  Table,
} from '../components/ui';
import { formatDate } from '../components/format';

const PAGE_SIZE = 15;
const LANGUAGES: Language[] = ['ENGLISH', 'FRENCH', 'SPANISH', 'TWI'];

export function ConversationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string>('');
  const [deleting, setDeleting] = useState<ConversationSummary | null>(null);

  const openId = searchParams.get('open');
  const conversations = useConversations({ page, size: PAGE_SIZE, query });
  const deleteConversation = useDeleteConversation();

  // The API pages by title; language is a client-side narrowing of the current page.
  const rows = (conversations.data?.content ?? []).filter(
    (conversation) => !language || conversation.language === language,
  );

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteConversation.mutateAsync(deleting.id);
    setDeleting(null);
  };

  return (
    <>
      <PageHeader title="Conversations" description="Every exchange the website has had with the AI." />

      <Card>
        <div className="flex flex-wrap gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="min-w-56 flex-1">
            <Input
              placeholder="Search by opening question…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
            />
          </div>
          <Select className="w-44" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">All languages</option>
            {LANGUAGES.map((value) => (
              <option key={value} value={value}>
                {value.charAt(0) + value.slice(1).toLowerCase()}
              </option>
            ))}
          </Select>
        </div>

        {conversations.isLoading ? (
          <Spinner />
        ) : conversations.error ? (
          <div className="p-4">
            <Alert tone="error">{errorMessage(conversations.error)}</Alert>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            title="No conversations"
            description={
              language ? 'No conversations in this language on the current page.' : 'Nothing recorded yet.'
            }
          />
        ) : (
          <>
            <Table headers={['Opening question', 'Language', 'Model', 'Last activity', '']}>
              {rows.map((conversation) => (
                <tr key={conversation.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSearchParams({ open: conversation.id })}
                      className="max-w-md truncate text-left font-medium hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {conversation.title ?? 'Untitled'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="blue">{conversation.language}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{conversation.model ?? '—'}</td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {formatDate(conversation.updatedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" aria-label="Delete" onClick={() => setDeleting(conversation)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
            {conversations.data && (
              <Pagination
                page={page}
                totalPages={conversations.data.totalPages}
                totalElements={conversations.data.totalElements}
                onChange={setPage}
              />
            )}
          </>
        )}
      </Card>

      <TranscriptModal id={openId} onClose={() => setSearchParams({})} />

      <Modal
        open={Boolean(deleting)}
        title="Delete conversation"
        onClose={() => setDeleting(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteConversation.isPending} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">This permanently removes the conversation and all of its messages.</p>
      </Modal>
    </>
  );
}

function TranscriptModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { data, isLoading, error } = useConversation(id);

  return (
    <Modal open={Boolean(id)} title="Transcript" onClose={onClose} wide>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Alert tone="error">{errorMessage(error)}</Alert>
      ) : data ? (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone="blue">{data.conversation.language}</Badge>
            {data.conversation.model && <Badge>{data.conversation.model}</Badge>}
            {data.conversation.provider && <Badge>{data.conversation.provider}</Badge>}
            <Badge>{formatDate(data.conversation.createdAt)}</Badge>
          </div>

          <div className="space-y-3">
            {data.messages.map((message) => {
              const isUser = message.role === 'USER';
              return (
                <div key={message.id} className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}>
                  <div
                    className={clsx(
                      'max-w-[85%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap',
                      isUser
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
                    )}
                  >
                    {message.content}
                    <span
                      className={clsx(
                        'mt-1.5 block text-xs',
                        isUser ? 'text-brand-100' : 'text-slate-500 dark:text-slate-400',
                      )}
                    >
                      {formatDate(message.createdAt)}
                      {message.latencyMs != null && ` · ${message.latencyMs} ms`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </Modal>
  );
}
