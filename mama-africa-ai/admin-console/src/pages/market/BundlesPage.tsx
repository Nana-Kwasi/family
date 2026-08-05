import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useBundles,
  useDeleteBundle,
  useProducts,
  useSaveBundle,
} from '../../api/market-hooks';
import type { Bundle, BundleInput } from '../../api/market-types';
import { PageHeader } from '../../components/AppLayout';
import { ImageThumb } from '../../components/ImagePicker';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Spinner,
} from '../../components/ui';

const EMPTY: BundleInput = {
  title: '',
  subtitle: '',
  description: '',
  active: true,
  productIds: [],
};

export function BundlesPage() {
  const { data: bundles, isLoading } = useBundles();
  const [editing, setEditing] = useState<Bundle | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Bundle | null>(null);
  const [error, setError] = useState('');
  const remove = useDeleteBundle();

  return (
    <>
      <PageHeader
        title="Bundles"
        description="Curated sets sold together on the store page."
        actions={
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreating(true)}>
            New bundle
          </Button>
        }
      />

      {error && <Alert tone="error">{error}</Alert>}

      {isLoading && <Spinner label="Loading bundles" />}

      {!isLoading && bundles && bundles.length === 0 && (
        <Card>
          <EmptyState
            title="No bundles yet"
            description="A bundle groups two or more products into one offer."
          />
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {bundles?.map((bundle) => (
          <Card key={bundle.id} className="p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-semibold">{bundle.title}</h2>
                  {!bundle.active && <Badge tone="slate">Hidden</Badge>}
                </div>
                {bundle.subtitle && (
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{bundle.subtitle}</p>
                )}
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  title="Edit"
                  onClick={() => setEditing(bundle)}
                  className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  title="Delete"
                  onClick={() => setConfirmDelete(bundle)}
                  className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {bundle.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 dark:border-slate-800"
                >
                  <ImageThumb path={item.image} size={28} />
                  <span className="max-w-[12rem] truncate text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <BundleEditor
        open={creating || editing !== null}
        bundle={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
      />

      <Modal
        open={confirmDelete !== null}
        title="Delete bundle"
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
                  setError(errorMessage(err, 'Could not delete the bundle'));
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
          Delete <strong>{confirmDelete?.title}</strong>? The products in it are not affected.
        </p>
      </Modal>
    </>
  );
}

function BundleEditor({
  open,
  bundle,
  onClose,
}: {
  open: boolean;
  bundle: Bundle | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BundleInput>(EMPTY);
  const [picked, setPicked] = useState<{ id: number; name: string; image: string | null }[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const save = useSaveBundle();

  // Only used to populate the "add a product" list, so a single page of matches is enough.
  const { data: options } = useProducts({ search, page: 0, size: 20, active: true });

  useEffect(() => {
    if (!open) return;
    setError('');
    setSearch('');
    if (bundle) {
      setForm({
        title: bundle.title,
        slug: bundle.slug,
        subtitle: bundle.subtitle ?? '',
        description: bundle.description ?? '',
        active: bundle.active,
        sortOrder: bundle.sortOrder,
        productIds: bundle.items.map((item) => item.id),
      });
      setPicked(bundle.items.map((item) => ({ id: item.id, name: item.name, image: item.image })));
    } else {
      setForm(EMPTY);
      setPicked([]);
    }
  }, [open, bundle]);

  const submit = async () => {
    setError('');
    if (!form.title.trim()) {
      setError('A bundle needs a title.');
      return;
    }
    if (picked.length < 2) {
      setError('A bundle needs at least two products.');
      return;
    }
    try {
      await save.mutateAsync({
        id: bundle?.id ?? null,
        input: { ...form, title: form.title.trim(), productIds: picked.map((p) => p.id) },
      });
      onClose();
    } catch (err) {
      setError(errorMessage(err, 'Could not save the bundle'));
    }
  };

  return (
    <Modal
      open={open}
      wide
      title={bundle ? `Edit — ${bundle.title}` : 'New bundle'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={save.isPending}>
            {bundle ? 'Save changes' : 'Create bundle'}
          </Button>
        </>
      }
    >
      {error && <Alert tone="error">{error}</Alert>}

      <div className="space-y-4">
        <Field label="Title">
          <Input
            value={form.title}
            onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
            placeholder="Akan Family Heritage Set"
          />
        </Field>

        <Field label="Subtitle">
          <Input
            value={form.subtitle ?? ''}
            onChange={(e) => setForm((c) => ({ ...c, subtitle: e.target.value }))}
            placeholder="Adult Tee + Baby Onesie"
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description ?? ''}
            onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </Field>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Products in this set{' '}
            <span className="font-normal text-slate-500 dark:text-slate-400">({picked.length})</span>
          </label>

          {picked.length > 0 && (
            <ul className="mb-3 space-y-2">
              {picked.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800"
                >
                  <ImageThumb path={item.image} size={32} />
                  <span className="min-w-0 flex-1 truncate text-sm">{item.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => setPicked((current) => current.filter((p) => p.id !== item.id))}
                    className="rounded p-1 text-slate-400 hover:text-rose-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products to add"
          />

          {search.trim() && options && (
            <ul className="mt-2 max-h-52 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800">
              {options.content
                .filter((option) => !picked.some((p) => p.id === option.id))
                .map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setPicked((current) => [
                          ...current,
                          { id: option.id, name: option.name, image: option.image },
                        ])
                      }
                      className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ImageThumb path={option.image} size={28} />
                      <span className="min-w-0 flex-1 truncate text-sm">{option.name}</span>
                      <Plus className="h-4 w-4 shrink-0 text-slate-400" />
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <Field label="Visibility">
          <Select
            value={form.active ? 'visible' : 'hidden'}
            onChange={(e) => setForm((c) => ({ ...c, active: e.target.value === 'visible' }))}
          >
            <option value="visible">Visible on the website</option>
            <option value="hidden">Hidden</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
