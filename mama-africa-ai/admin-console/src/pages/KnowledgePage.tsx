import { useState } from 'react';
import { FileText, Pencil, RefreshCw, Search, Trash2, Upload } from 'lucide-react';
import {
  useCategories,
  useDeleteDocument,
  useDocument,
  useDocuments,
  useKnowledgeSearch,
  useReindexAll,
  useReindexDocument,
  useUpdateDocument,
  useUploadDocument,
} from '../api/hooks';
import { errorMessage } from '../api/client';
import type { KnowledgeDocument } from '../api/types';
import { PageHeader } from '../components/AppLayout';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Pagination,
  Select,
  Spinner,
  Table,
} from '../components/ui';
import { formatBytes, formatDate, STATUS_TONES } from '../components/format';

const PAGE_SIZE = 10;

export function KnowledgePage() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editing, setEditing] = useState<KnowledgeDocument | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<KnowledgeDocument | null>(null);
  const [semanticQuery, setSemanticQuery] = useState('');
  const [feedback, setFeedback] = useState('');

  const categories = useCategories();
  const documents = useDocuments({ page, size: PAGE_SIZE, query, categoryId });
  const reindexAll = useReindexAll();
  const reindexOne = useReindexDocument();
  const deleteDocument = useDeleteDocument();

  const handleReindexAll = async () => {
    const result = await reindexAll.mutateAsync();
    setFeedback(`Queued ${result.queued} document${result.queued === 1 ? '' : 's'} for re-indexing.`);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteDocument.mutateAsync(deleting.id);
    setDeleting(null);
    setFeedback('Document and its vectors deleted.');
  };

  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Documents the AI searches before answering."
        actions={
          <>
            <Button
              variant="secondary"
              icon={<RefreshCw className="h-4 w-4" />}
              loading={reindexAll.isPending}
              onClick={handleReindexAll}
            >
              Re-index all
            </Button>
            <Button icon={<Upload className="h-4 w-4" />} onClick={() => setUploadOpen(true)}>
              Upload
            </Button>
          </>
        }
      />

      {feedback && (
        <div className="mb-4">
          <Alert tone="success">{feedback}</Alert>
        </div>
      )}

      <SemanticSearch
        query={semanticQuery}
        onQueryChange={setSemanticQuery}
        categories={categories.data ?? []}
      />

      <Card className="mt-6">
        <div className="flex flex-wrap gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="min-w-56 flex-1">
            <Input
              placeholder="Filter by title or file name…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
            />
          </div>
          <Select
            className="w-56"
            value={categoryId ?? ''}
            onChange={(e) => {
              setCategoryId(e.target.value ? Number(e.target.value) : null);
              setPage(0);
            }}
          >
            <option value="">All categories</option>
            {categories.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        {documents.isLoading ? (
          <Spinner />
        ) : documents.error ? (
          <div className="p-4">
            <Alert tone="error">{errorMessage(documents.error)}</Alert>
          </div>
        ) : documents.data && documents.data.content.length === 0 ? (
          <EmptyState
            title="No documents"
            description="Upload a PDF, DOCX, TXT or Markdown file to give the AI source material."
          />
        ) : (
          <>
            <Table headers={['Title', 'Category', 'Status', 'Chunks', 'Size', 'Uploaded', '']}>
              {documents.data?.content.map((document) => (
                <tr key={document.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setViewingId(document.id)}
                      className="flex items-center gap-2 text-left font-medium hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="truncate">{document.title}</span>
                    </button>
                    <span className="ml-6 block truncate text-xs text-slate-500 dark:text-slate-400">
                      {document.fileName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {document.category ? <Badge>{document.category.name}</Badge> : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={STATUS_TONES[document.status]}>{document.status}</Badge>
                    {document.errorMessage && (
                      <span className="mt-1 block max-w-56 truncate text-xs text-red-600 dark:text-red-400">
                        {document.errorMessage}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 tabular-nums">{document.chunkCount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatBytes(document.sizeBytes)}</td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {formatDate(document.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        aria-label="Re-index"
                        title="Re-index"
                        onClick={() => reindexOne.mutate(document.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        aria-label="Edit"
                        title="Edit"
                        onClick={() => setEditing(document)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        aria-label="Delete"
                        title="Delete"
                        onClick={() => setDeleting(document)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
            {documents.data && (
              <Pagination
                page={page}
                totalPages={documents.data.totalPages}
                totalElements={documents.data.totalElements}
                onChange={setPage}
              />
            )}
          </>
        )}
      </Card>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} categories={categories.data ?? []} />

      <EditModal document={editing} onClose={() => setEditing(null)} categories={categories.data ?? []} />

      <ViewModal id={viewingId} onClose={() => setViewingId(null)} />

      <Modal
        open={Boolean(deleting)}
        title="Delete document"
        onClose={() => setDeleting(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteDocument.isPending} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Delete <strong>{deleting?.title}</strong>? Its chunks are removed from the vector store and the AI
          will stop using it. This cannot be undone.
        </p>
      </Modal>
    </>
  );
}

function SemanticSearch({
  query,
  onQueryChange,
  categories,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  categories: { id: number; name: string; slug: string }[];
}) {
  const [submitted, setSubmitted] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const results = useKnowledgeSearch(submitted, categorySlug, Boolean(submitted));

  return (
    <Card className="p-4">
      <form
        className="flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(query);
        }}
      >
        <div className="min-w-56 flex-1">
          <Input
            placeholder="Ask what the AI would retrieve, e.g. “festival about surviving famine”"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <Select className="w-48" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button type="submit" icon={<Search className="h-4 w-4" />} disabled={!query.trim()}>
          Search
        </Button>
      </form>

      {results.isFetching && <Spinner label="Searching" />}

      {results.data && !results.isFetching && (
        <div className="mt-4 space-y-2">
          {results.data.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nothing matched. The AI would answer from its general knowledge.
            </p>
          ) : (
            results.data.map((match, index) => (
              <div
                key={`${match.documentId}-${index}`}
                className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-medium">{match.title}</span>
                  {match.category && <Badge>{match.category}</Badge>}
                  <Badge tone={match.score >= 0.6 ? 'green' : 'amber'}>{match.score.toFixed(3)}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{match.excerpt}</p>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
}

function UploadModal({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  categories: { id: number; name: string; slug: string }[];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [error, setError] = useState('');
  const upload = useUploadDocument();

  const close = () => {
    setFile(null);
    setTitle('');
    setCategorySlug('');
    setError('');
    onClose();
  };

  const handleUpload = async () => {
    if (!file) return;
    setError('');
    try {
      await upload.mutateAsync({ file, title, categorySlug });
      close();
    } catch (e) {
      setError(errorMessage(e, 'Upload failed'));
    }
  };

  return (
    <Modal
      open={open}
      title="Upload document"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button loading={upload.isPending} disabled={!file} onClick={handleUpload}>
            Upload
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <Alert tone="error">{error}</Alert>}

        <Field label="File" hint="PDF, DOCX, TXT or Markdown. Scanned PDFs need OCR first.">
          <Input
            type="file"
            accept=".pdf,.docx,.doc,.txt,.md,.markdown"
            onChange={(e) => {
              const selected = e.target.files?.[0] ?? null;
              setFile(selected);
              if (selected && !title) setTitle(selected.name.replace(/\.[^.]+$/, ''));
            }}
          />
        </Field>

        <Field label="Title" hint="Shown in search results and used as chunk metadata.">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Defaults to the file name" />
        </Field>

        <Field label="Category">
          <Select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
            <option value="">Uncategorised</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Text is extracted immediately, then chunking and embedding run in the background. Watch the status
          column.
        </p>
      </div>
    </Modal>
  );
}

function EditModal({
  document,
  onClose,
  categories,
}: {
  document: KnowledgeDocument | null;
  onClose: () => void;
  categories: { id: number; name: string; slug: string }[];
}) {
  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [initialised, setInitialised] = useState<string | null>(null);
  const update = useUpdateDocument();

  // Seed the form the first time a given document opens.
  if (document && initialised !== document.id) {
    setInitialised(document.id);
    setTitle(document.title);
    setCategorySlug(document.category?.slug ?? '');
  }

  const close = () => {
    setInitialised(null);
    onClose();
  };

  const handleSave = async () => {
    if (!document) return;
    await update.mutateAsync({ id: document.id, title, categorySlug });
    close();
  };

  return (
    <Modal
      open={Boolean(document)}
      title="Edit document"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button loading={update.isPending} disabled={!title.trim()} onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label="Category">
          <Select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
            <option value="">Uncategorised</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Title and category are stored on every chunk, so saving re-indexes the document.
        </p>
      </div>
    </Modal>
  );
}

function ViewModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { data, isLoading } = useDocument(id);

  return (
    <Modal open={Boolean(id)} title={data?.document.title ?? 'Document'} onClose={onClose} wide>
      {isLoading || !data ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone={STATUS_TONES[data.document.status]}>{data.document.status}</Badge>
            <Badge>{data.document.chunkCount} chunks</Badge>
            <Badge>{formatBytes(data.document.sizeBytes)}</Badge>
            {data.document.category && <Badge tone="blue">{data.document.category.name}</Badge>}
          </div>
          <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            Extracted text — this is exactly what the AI indexes.
          </p>
          <pre className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed whitespace-pre-wrap dark:bg-slate-950">
            {data.content}
          </pre>
        </>
      )}
    </Modal>
  );
}
