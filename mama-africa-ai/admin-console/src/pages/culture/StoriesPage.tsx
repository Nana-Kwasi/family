import { useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useDeleteStory,
  useSetStoryPublished,
  useStories,
  useStory,
} from '../../api/culture-hooks';
import { CONTENT_TYPE_LABELS, type StoryKind } from '../../api/culture-types';
import { PageHeader } from '../../components/AppLayout';
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
} from '../../components/ui';
import { StoryEditor } from './StoryEditor';

export function CultureStoriesPage() {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [kind, setKind] = useState<'' | StoryKind>('');
  const [visibility, setVisibility] = useState('');
  const [page, setPage] = useState(0);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; label: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useStories({
    search: debounced,
    kind: kind || undefined,
    published: visibility === '' ? undefined : visibility === 'published',
    page,
    size: 25,
  });

  const { data: editing } = useStory(editorOpen ? editingId : null);
  const setPublished = useSetStoryPublished();
  const remove = useDeleteStory();

  return (
    <>
      <PageHeader
        title="Stories & Proverbs"
        description="Everything on the website's Stories page. This replaces the old posting screen on the site itself."
        actions={
          <Button
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingId(null);
              setEditorOpen(true);
            }}
          >
            New post
          </Button>
        }
      />

      {error && <Alert tone="error">{error}</Alert>}

      <Card className="mb-4">
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or text"
              className="pl-9"
            />
          </div>
          <Select
            value={kind}
            onChange={(e) => {
              setKind(e.target.value as '' | StoryKind);
              setPage(0);
            }}
          >
            <option value="">Stories and proverbs</option>
            <option value="STORY">Stories only</option>
            <option value="PROVERB">Proverbs only</option>
          </Select>
          <Select
            value={visibility}
            onChange={(e) => {
              setVisibility(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Published and drafts</option>
            <option value="published">Published only</option>
            <option value="draft">Drafts only</option>
          </Select>
        </div>
      </Card>

      <Card>
        {isLoading && <Spinner label="Loading stories" />}

        {!isLoading && data && data.content.length === 0 && (
          <EmptyState title="Nothing here yet" description="Write a story or a proverb to get started." />
        )}

        {!isLoading && data && data.content.length > 0 && (
          <>
            <Table headers={['Post', 'Type', 'Shelf', 'Status', '']}>
              {data.content.map((story) => (
                <tr key={story.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{story.title || <em className="text-slate-500">Untitled</em>}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {story.slug}
                      {story.author ? ` · ${story.author}` : ''}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {story.kind === 'PROVERB' ? 'Proverb' : 'Story'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{CONTENT_TYPE_LABELS[story.contentType]}</td>
                  <td className="px-4 py-3">
                    {story.published ? <Badge tone="green">Published</Badge> : <Badge tone="slate">Draft</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        title={story.published ? 'Unpublish' : 'Publish'}
                        onClick={async () => {
                          setError('');
                          try {
                            await setPublished.mutateAsync({ id: story.id, published: !story.published });
                          } catch (err) {
                            setError(errorMessage(err, 'Could not change visibility'));
                          }
                        }}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                      >
                        {story.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditingId(story.id);
                          setEditorOpen(true);
                        }}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() =>
                          setConfirmDelete({ id: story.id, label: story.title || story.slug })
                        }
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

      <StoryEditor
        open={editorOpen}
        story={editingId === null ? null : (editing ?? null)}
        onClose={() => {
          setEditorOpen(false);
          setEditingId(null);
        }}
      />

      <Modal
        open={confirmDelete !== null}
        title="Delete post"
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
                setError('');
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
          Delete <strong>{confirmDelete?.label}</strong>? Its reviews go with it and this cannot be undone.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          To take it off the website but keep it, unpublish it instead.
        </p>
      </Modal>
    </>
  );
}
