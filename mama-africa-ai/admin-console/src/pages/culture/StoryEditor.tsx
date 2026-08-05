import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import { useSaveStory } from '../../api/culture-hooks';
import {
  CONTENT_TYPE_LABELS,
  type Chapter,
  type ContentType,
  type SocialLink,
  type Story,
  type StoryInput,
  type StoryKind,
} from '../../api/culture-types';
import { Alert, Button, Field, Input, Modal, Select } from '../../components/ui';

const EMPTY: StoryInput = {
  kind: 'STORY',
  title: '',
  content: '',
  contentType: 'GENERAL',
  published: true,
  author: '',
  chapters: [],
  socialLinks: [],
};

const TEXTAREA =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ' +
  'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900';

export function StoryEditor({
  open,
  story,
  onClose,
}: {
  open: boolean;
  story: Story | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<StoryInput>(EMPTY);
  const [error, setError] = useState('');
  const save = useSaveStory();

  useEffect(() => {
    if (!open) return;
    setError('');
    setForm(
      story
        ? {
            kind: story.kind,
            title: story.title ?? '',
            content: story.content,
            contentType: story.contentType,
            published: story.published,
            author: story.author ?? '',
            sortOrder: story.sortOrder,
            chapters: story.chapters,
            socialLinks: story.socialLinks,
          }
        : EMPTY,
    );
  }, [open, story]);

  const set = <K extends keyof StoryInput>(key: K, value: StoryInput[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const isProverb = form.kind === 'PROVERB';

  const submit = async () => {
    setError('');
    if (!form.content.trim()) {
      setError(isProverb ? 'Write the proverb and its meaning.' : 'A story needs some content.');
      return;
    }
    try {
      await save.mutateAsync({
        id: story?.id ?? null,
        input: {
          ...form,
          title: form.title?.trim() || null,
          author: form.author?.trim() || null,
          // The backend drops these for a proverb anyway; not sending them keeps the
          // request honest about what is being saved.
          chapters: isProverb ? [] : form.chapters.filter((c) => c.content.trim()),
          socialLinks: form.socialLinks.filter((l) => l.label.trim() && l.url.trim()),
        },
      });
      onClose();
    } catch (err) {
      setError(errorMessage(err, 'Could not save'));
    }
  };

  return (
    <Modal
      open={open}
      wide
      title={story ? `Edit — ${story.title || story.kind}` : 'New post'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={save.isPending}>
            {story ? 'Save changes' : 'Publish'}
          </Button>
        </>
      }
    >
      {error && <Alert tone="error">{error}</Alert>}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Type</label>
          <div className="flex gap-2">
            {(['STORY', 'PROVERB'] as StoryKind[]).map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => set('kind', kind)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  form.kind === kind
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {kind === 'STORY' ? 'Story' : 'Proverb'}
              </button>
            ))}
          </div>
          {isProverb && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              A proverb is filed as General and has no chapters.
            </p>
          )}
        </div>

        <Field label="Title" hint="Optional — an untitled story is named from its opening words">
          <Input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} />
        </Field>

        {!isProverb && (
          <Field label="Shelf">
            <Select
              value={form.contentType}
              onChange={(e) => set('contentType', e.target.value as ContentType)}
            >
              {(Object.keys(CONTENT_TYPE_LABELS) as ContentType[]).map((value) => (
                <option key={value} value={value}>
                  {CONTENT_TYPE_LABELS[value]}
                </option>
              ))}
            </Select>
          </Field>
        )}

        <Field label={isProverb ? 'Proverb and meaning' : 'Content'}>
          <textarea
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={isProverb ? 4 : 8}
            className={TEXTAREA}
            placeholder={isProverb ? 'Write the proverb and its meaning…' : 'Write your story…'}
          />
        </Field>

        {!isProverb && (
          <ChapterList values={form.chapters} onChange={(chapters) => set('chapters', chapters)} />
        )}

        <LinkList values={form.socialLinks} onChange={(links) => set('socialLinks', links)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Author">
            <Input value={form.author ?? ''} onChange={(e) => set('author', e.target.value)} placeholder="Afia" />
          </Field>
          <Field label="Visibility">
            <Select
              value={form.published ? 'published' : 'draft'}
              onChange={(e) => set('published', e.target.value === 'published')}
            >
              <option value="published">Published on the website</option>
              <option value="draft">Draft — hidden</option>
            </Select>
          </Field>
        </div>
      </div>
    </Modal>
  );
}

function ChapterList({
  values,
  onChange,
}: {
  values: Chapter[];
  onChange: (chapters: Chapter[]) => void;
}) {
  const update = (index: number, key: keyof Chapter, value: string) =>
    onChange(values.map((c, i) => (i === index ? { ...c, [key]: value } : c)));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">Chapters</label>
        <Button
          variant="secondary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => onChange([...values, { heading: '', content: '' }])}
        >
          Add chapter
        </Button>
      </div>
      {values.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          None. A short story does not need them — the content above stands on its own.
        </p>
      ) : (
        <div className="space-y-3">
          {values.map((chapter, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <Input
                  value={chapter.heading ?? ''}
                  placeholder={`Chapter ${index + 1} heading`}
                  onChange={(e) => update(index, 'heading', e.target.value)}
                />
                <button
                  type="button"
                  aria-label="Remove chapter"
                  onClick={() => onChange(values.filter((_, i) => i !== index))}
                  className="rounded p-1.5 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={chapter.content}
                onChange={(e) => update(index, 'content', e.target.value)}
                rows={4}
                className={TEXTAREA}
                placeholder="Chapter text…"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LinkList({
  values,
  onChange,
}: {
  values: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}) {
  const update = (index: number, key: keyof SocialLink, value: string) =>
    onChange(values.map((l, i) => (i === index ? { ...l, [key]: value } : l)));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">Links</label>
        <Button
          variant="secondary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => onChange([...values, { label: '', url: '' }])}
        >
          Add link
        </Button>
      </div>
      {values.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">None.</p>
      ) : (
        <div className="space-y-2">
          {values.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={link.label}
                placeholder="Label"
                onChange={(e) => update(index, 'label', e.target.value)}
                className="max-w-[10rem]"
              />
              <Input
                value={link.url}
                placeholder="https://…"
                onChange={(e) => update(index, 'url', e.target.value)}
              />
              <button
                type="button"
                aria-label="Remove link"
                onClick={() => onChange(values.filter((_, i) => i !== index))}
                className="rounded p-1.5 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
