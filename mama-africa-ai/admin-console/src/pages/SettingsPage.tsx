import { useState } from 'react';
import { Info, Pencil, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import {
  useCategories,
  useDeleteCategory,
  useResetSettings,
  useSaveCategory,
  useSettings,
  useUpdateSettings,
} from '../api/hooks';
import { errorMessage } from '../api/client';
import type { Category, Settings, SettingsUpdate } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { PageHeader } from '../components/AppLayout';
import { Alert, Badge, Button, Card, Field, Input, Modal, Select, Spinner, Table } from '../components/ui';
import { formatDate } from '../components/format';

function ReadOnlyField({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <p className="truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
        {String(value)}
      </p>
      {hint && <span className="block text-xs text-slate-500 dark:text-slate-400">{hint}</span>}
    </div>
  );
}

export function SettingsPage() {
  const settings = useSettings();

  if (settings.isLoading) return <Spinner label="Loading settings" />;
  if (settings.error || !settings.data) return <Alert tone="error">{errorMessage(settings.error)}</Alert>;

  return (
    <>
      <PageHeader title="AI Settings" description="How the assistant behaves. Changes apply immediately." />
      <SettingsForm settings={settings.data} />
      <CategoriesCard />
    </>
  );
}

function toDraft(settings: Settings): SettingsUpdate {
  return {
    provider: settings.provider,
    baseUrl: settings.baseUrl,
    model: settings.model,
    temperature: settings.temperature,
    maxTokens: settings.maxTokens,
    systemPrompt: settings.systemPrompt,
    ragEnabled: settings.ragEnabled,
    chunkSize: settings.chunkSize,
    chunkOverlap: settings.chunkOverlap,
    maxResults: settings.maxResults,
    minScore: settings.minScore,
  };
}

function SettingsForm({ settings }: { settings: Settings }) {
  const { isSuperAdmin } = useAuth();
  const update = useUpdateSettings();
  const reset = useResetSettings();

  const [draft, setDraft] = useState<SettingsUpdate>(() => toDraft(settings));
  const [savedFrom, setSavedFrom] = useState(settings.updatedAt);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  // Pull in a change made elsewhere (or by the reset) without clobbering an in-progress edit.
  if (settings.updatedAt !== savedFrom) {
    setSavedFrom(settings.updatedAt);
    setDraft(toDraft(settings));
  }

  const set = <K extends keyof SettingsUpdate>(key: K, value: SettingsUpdate[K]) => {
    setDraft({ ...draft, [key]: value });
    setSaved('');
  };

  const dirty = JSON.stringify(draft) !== JSON.stringify(toDraft(settings));
  const chunkingChanged =
    draft.chunkSize !== settings.chunkSize || draft.chunkOverlap !== settings.chunkOverlap;

  const handleSave = async () => {
    setError('');
    setSaved('');
    try {
      await update.mutateAsync(draft);
      setSaved(
        chunkingChanged
          ? 'Saved. Chunk settings changed — re-index the knowledge base for them to take effect.'
          : 'Saved. The next request uses the new settings.',
      );
    } catch (e) {
      setError(errorMessage(e, 'Could not save the settings'));
    }
  };

  const handleReset = async () => {
    setError('');
    setSaved('');
    try {
      await reset.mutateAsync();
      setConfirmReset(false);
      setSaved('Settings restored from the environment variables.');
    } catch (e) {
      setError(errorMessage(e, 'Could not reset the settings'));
      setConfirmReset(false);
    }
  };

  return (
    <>
      {!isSuperAdmin && (
        <div className="mb-4">
          <Alert tone="error">
            You can view these settings, but only a super admin can change them.
          </Alert>
        </div>
      )}
      {error && (
        <div className="mb-4">
          <Alert tone="error">{error}</Alert>
        </div>
      )}
      {saved && (
        <div className="mb-4">
          <Alert tone="success">{saved}</Alert>
        </div>
      )}

      <fieldset disabled={!isSuperAdmin} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold">Model</h2>
            <div className="space-y-4">
              <Field
                label="Provider"
                hint="OLLAMA for a local server; OPENAI for any OpenAI-compatible endpoint, such as vLLM on RunPod."
              >
                <Select value={draft.provider} onChange={(e) => set('provider', e.target.value)}>
                  <option value="OLLAMA">Ollama (local)</option>
                  <option value="OPENAI">OpenAI-compatible (RunPod / vLLM)</option>
                </Select>
              </Field>

              <Field label="Provider URL">
                <Input
                  value={draft.baseUrl}
                  onChange={(e) => set('baseUrl', e.target.value)}
                  placeholder="http://localhost:11434"
                />
              </Field>

              <Field label="Model name">
                <Input
                  value={draft.model}
                  onChange={(e) => set('model', e.target.value)}
                  placeholder="gemma3:1b"
                />
              </Field>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Temperature">
                  <Input
                    type="number" min={0} max={2} step={0.1}
                    value={draft.temperature}
                    onChange={(e) => set('temperature', Number(e.target.value))}
                  />
                </Field>
                <Field label="Max tokens">
                  <Input
                    type="number" min={1} max={32000} step={64}
                    value={draft.maxTokens}
                    onChange={(e) => set('maxTokens', Number(e.target.value))}
                  />
                </Field>
                <ReadOnlyField label="Timeout (s)" value={settings.timeoutSeconds} />
              </div>

              <p className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                The API key and timeout stay in the environment — secrets are never stored here.
              </p>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold">Knowledge retrieval</h2>
            <div className="space-y-4">
              <Field label="Use the knowledge base" hint="When off, the AI answers from general knowledge only.">
                <Select
                  value={draft.ragEnabled ? 'true' : 'false'}
                  onChange={(e) => set('ragEnabled', e.target.value === 'true')}
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </Select>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Max results" hint="Chunks put into the prompt.">
                  <Input
                    type="number" min={1} max={20}
                    value={draft.maxResults}
                    onChange={(e) => set('maxResults', Number(e.target.value))}
                  />
                </Field>
                <Field label="Minimum score" hint="Below this, a chunk is ignored.">
                  <Input
                    type="number" min={0} max={1} step={0.05}
                    value={draft.minScore}
                    onChange={(e) => set('minScore', Number(e.target.value))}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Chunk size">
                  <Input
                    type="number" min={100} max={8000} step={50}
                    value={draft.chunkSize}
                    onChange={(e) => set('chunkSize', Number(e.target.value))}
                  />
                </Field>
                <Field label="Chunk overlap">
                  <Input
                    type="number" min={0} max={2000} step={10}
                    value={draft.chunkOverlap}
                    onChange={(e) => set('chunkOverlap', Number(e.target.value))}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ReadOnlyField label="Embedding provider" value={settings.embeddingProvider} />
                <ReadOnlyField label="Embedding model" value={settings.embeddingModel} />
              </div>
              <ReadOnlyField
                label="Qdrant collection"
                value={settings.qdrantCollection}
                hint="Changing the embedding model needs a new collection, so it stays environment-only."
              />
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="mb-1 text-sm font-semibold">System prompt</h2>
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
            Sent with every request. The response language and any retrieved knowledge are appended
            automatically.
          </p>
          <textarea
            value={draft.systemPrompt}
            onChange={(e) => set('systemPrompt', e.target.value)}
            rows={7}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-relaxed text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </Card>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last changed {formatDate(settings.updatedAt)}
          {settings.updatedBy && ` by ${settings.updatedBy}`}
        </p>
        {isSuperAdmin && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={<RotateCcw className="h-4 w-4" />}
              onClick={() => setConfirmReset(true)}
            >
              Reset to environment
            </Button>
            <Button
              icon={<Save className="h-4 w-4" />}
              loading={update.isPending}
              disabled={!dirty}
              onClick={handleSave}
            >
              {dirty ? 'Save changes' : 'Saved'}
            </Button>
          </div>
        )}
      </div>

      <Modal
        open={confirmReset}
        title="Reset to environment defaults"
        onClose={() => setConfirmReset(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button variant="danger" loading={reset.isPending} onClick={handleReset}>
              Reset
            </Button>
          </>
        }
      >
        <p className="text-sm">
          This discards every change made here and restores the values from the <code>AI_*</code> and{' '}
          <code>RAG_*</code> environment variables. Categories and documents are untouched.
        </p>
      </Modal>
    </>
  );
}

function CategoriesCard() {
  const categories = useCategories();
  const saveCategory = useSaveCategory();
  const deleteCategory = useDeleteCategory();
  const [editing, setEditing] = useState<Category | 'new' | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const open = (target: Category | 'new') => {
    setEditing(target);
    setName(target === 'new' ? '' : target.name);
    setDescription(target === 'new' ? '' : (target.description ?? ''));
    setError('');
  };

  const handleSave = async () => {
    setError('');
    try {
      await saveCategory.mutateAsync({
        id: editing && editing !== 'new' ? editing.id : undefined,
        name,
        description,
      });
      setEditing(null);
    } catch (e) {
      setError(errorMessage(e, 'Could not save the category'));
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteCategory.mutateAsync(deleting.id);
    setDeleting(null);
  };

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-semibold">Categories</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Used to group documents and to narrow retrieval.
          </p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => open('new')}>
          New
        </Button>
      </div>

      {categories.isLoading ? (
        <Spinner />
      ) : (
        <Table headers={['Name', 'Slug', 'Description', '']}>
          {categories.data?.map((category) => (
            <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-4 py-3 font-medium">{category.name}</td>
              <td className="px-4 py-3">
                <Badge>{category.slug}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{category.description ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" aria-label="Edit" onClick={() => open(category)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" aria-label="Delete" onClick={() => setDeleting(category)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <Modal
        open={Boolean(editing)}
        title={editing === 'new' ? 'New category' : 'Edit category'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button loading={saveCategory.isPending} disabled={!name.trim()} onClick={handleSave}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {error && <Alert tone="error">{error}</Alert>}
          <Field label="Name" hint="The slug is derived from the name automatically.">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kingdoms" />
          </Field>
          <Field label="Description">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ashanti, Dagbon, Ga and other kingdoms"
            />
          </Field>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleting)}
        title="Delete category"
        onClose={() => setDeleting(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteCategory.isPending} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Delete <strong>{deleting?.name}</strong>? Documents in it are kept but become uncategorised.
        </p>
      </Modal>
    </Card>
  );
}
