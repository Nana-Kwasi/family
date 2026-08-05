import { useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useDeleteProduct,
  useProduct,
  useProducts,
  useSetProductActive,
} from '../../api/market-hooks';
import { BORN_DAYS } from '../../api/market-types';
import { PageHeader } from '../../components/AppLayout';
import { ImageThumb } from '../../components/ImagePicker';
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
import { ProductEditor } from './ProductEditor';

const PAGE_SIZE = 25;

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'tshirt', label: 'T-Shirts' },
  { value: 'mug', label: 'Mugs' },
  { value: 'babysuit', label: 'Baby Onesies' },
  { value: 'hoodie', label: 'Hoodies' },
];

export function ProductsPage() {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [bornDay, setBornDay] = useState('');
  const [type, setType] = useState('');
  const [visibility, setVisibility] = useState('');
  const [page, setPage] = useState(0);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useProducts({
    search: debounced,
    bornDay: bornDay || undefined,
    type: type || undefined,
    active: visibility === '' ? undefined : visibility === 'visible',
    page,
    size: PAGE_SIZE,
  });

  // Loaded only while the editor is open; the table itself carries no child collections.
  const { data: editing } = useProduct(editorOpen ? editingId : null);

  const setActive = useSetProductActive();
  const remove = useDeleteProduct();

  const openNew = () => {
    setEditingId(null);
    setEditorOpen(true);
  };

  const openEdit = (id: number) => {
    setEditingId(id);
    setEditorOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Products"
        description="Everything the store page shows. Changes appear on the website as soon as they are saved."
        actions={
          <Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>
            New product
          </Button>
        }
      />

      {error && <Alert tone="error">{error}</Alert>}

      <Card className="mb-4">
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="pl-9"
            />
          </div>
          <Select
            value={bornDay}
            onChange={(e) => {
              setBornDay(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All days</option>
            {BORN_DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(0);
            }}
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            value={visibility}
            onChange={(e) => {
              setVisibility(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Visible and hidden</option>
            <option value="visible">Visible only</option>
            <option value="hidden">Hidden only</option>
          </Select>
        </div>
      </Card>

      <Card>
        {isLoading && <Spinner label="Loading products" />}

        {!isLoading && data && data.content.length === 0 && (
          <EmptyState
            title="No products match these filters"
            description="Clear the filters, or create a product."
          />
        )}

        {!isLoading && data && data.content.length > 0 && (
          <>
            <Table headers={['', 'Product', 'Day', 'Type', 'Price', 'Status', '']}>
              {data.content.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2 pl-4">
                    <ImageThumb path={product.image} />
                  </td>
                  <td className="px-4 py-2">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{product.slug}</p>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.bornDay ?? '—'}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.label}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    ${(product.priceCents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {!product.active && <Badge tone="slate">Hidden</Badge>}
                      {product.soldOut && <Badge tone="amber">Sold out</Badge>}
                      {product.featured && <Badge tone="blue">Featured</Badge>}
                      {product.active && !product.soldOut && !product.featured && (
                        <Badge tone="green">Live</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-1">
                      <button
                        title={product.active ? 'Hide from the website' : 'Show on the website'}
                        onClick={async () => {
                          setError('');
                          try {
                            await setActive.mutateAsync({ id: product.id, active: !product.active });
                          } catch (err) {
                            setError(errorMessage(err, 'Could not change visibility'));
                          }
                        }}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                      >
                        {product.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        title="Edit"
                        onClick={() => openEdit(product.id)}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => setConfirmDelete({ id: product.id, name: product.name })}
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

      <ProductEditor
        open={editorOpen}
        product={editingId === null ? null : (editing ?? null)}
        onClose={() => {
          setEditorOpen(false);
          setEditingId(null);
        }}
      />

      <Modal
        open={confirmDelete !== null}
        title="Delete product"
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
                  setConfirmDelete(null);
                } catch (err) {
                  setError(errorMessage(err, 'Could not delete the product'));
                  setConfirmDelete(null);
                }
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Delete <strong>{confirmDelete?.name}</strong>? It disappears from the website immediately and
          this cannot be undone.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          To take it off sale but keep it, hide it instead.
        </p>
      </Modal>
    </>
  );
}
