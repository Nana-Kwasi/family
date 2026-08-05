import { useEffect, useMemo, useState } from 'react';
import { GripVertical, Images, Plus, Star, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import { useSaveProduct } from '../../api/market-hooks';
import { BORN_DAYS, type Product, type ProductInput, type SizeChartRow } from '../../api/market-types';
import { ImagePicker, ImageThumb } from '../../components/ImagePicker';
import { Alert, Button, Field, Input, Modal, Select } from '../../components/ui';

/** Types the catalogue already uses. Free text, so an admin can introduce a new one. */
const KNOWN_TYPES = [
  { value: 'tshirt', label: 'T-Shirt' },
  { value: 'mug', label: 'Mug' },
  { value: 'babysuit', label: 'Baby Onesie' },
  { value: 'hoodie', label: 'Hoodie' },
];

const EMPTY: ProductInput = {
  name: '',
  bornDay: '',
  collection: '',
  type: 'tshirt',
  label: 'T-Shirt',
  tagline: '',
  cardBlurb: '',
  description: '',
  priceCents: 2000,
  image: '',
  images: [],
  sizes: [],
  details: [],
  perfectFor: [],
  sizeChart: [],
  amazonUrl: '',
  etsyUrl: '',
  printifyUrl: '',
  soldOut: false,
  active: true,
  featured: false,
};

function toInput(product: Product): ProductInput {
  return {
    name: product.name,
    slug: product.slug,
    bornDay: product.bornDay ?? '',
    collection: product.collection ?? '',
    type: product.type,
    label: product.label,
    tagline: product.tagline ?? '',
    cardBlurb: product.cardBlurb ?? '',
    description: product.description ?? '',
    priceCents: product.priceCents,
    image: product.image ?? '',
    images: product.images,
    sizes: product.sizes,
    details: product.details,
    perfectFor: product.perfectFor,
    sizeChart: product.sizeChart,
    amazonUrl: product.amazonUrl ?? '',
    etsyUrl: product.etsyUrl ?? '',
    printifyUrl: product.printifyUrl ?? '',
    soldOut: product.soldOut,
    active: product.active,
    featured: product.featured,
    sortOrder: product.sortOrder,
  };
}

export function ProductEditor({
  open,
  product,
  onClose,
}: {
  open: boolean;
  /** null creates a new product. */
  product: Product | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [priceText, setPriceText] = useState('20.00');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState('');
  const save = useSaveProduct();

  useEffect(() => {
    if (!open) return;
    const next = product ? toInput(product) : EMPTY;
    setForm(next);
    setPriceText((next.priceCents / 100).toFixed(2));
    setError('');
  }, [open, product]);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  // Price is edited as decimal text so a half-typed "2." does not collapse to 2.00 mid-keystroke.
  const onPriceChange = (value: string) => {
    setPriceText(value);
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      set('priceCents', Math.round(parsed * 100));
    }
  };

  const submit = async () => {
    setError('');
    if (!form.name.trim()) {
      setError('A product needs a name.');
      return;
    }
    if (!Number.isFinite(Number.parseFloat(priceText))) {
      setError('Enter a price, for example 20.00');
      return;
    }
    try {
      await save.mutateAsync({
        id: product?.id ?? null,
        input: {
          ...form,
          name: form.name.trim(),
          bornDay: form.bornDay || null,
          collection: form.collection || null,
          // Sending the existing slug keeps the URL stable across edits; a new product
          // lets the backend derive one from the name.
          slug: product ? product.slug : null,
        },
      });
      onClose();
    } catch (err) {
      setError(errorMessage(err, 'Could not save the product'));
    }
  };

  return (
    <>
      <Modal
        open={open}
        wide
        title={product ? `Edit — ${product.name}` : 'New product'}
        onClose={onClose}
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit} loading={save.isPending}>
              {product ? 'Save changes' : 'Create product'}
            </Button>
          </>
        }
      >
        {error && <Alert tone="error">{error}</Alert>}

        <div className="space-y-5">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Kofi Friday Born Mug — Sankofa" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Day born" hint="Drives the store's day filter">
              <Select value={form.bornDay ?? ''} onChange={(e) => set('bornDay', e.target.value)}>
                <option value="">None</option>
                {BORN_DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Type">
              <Select
                value={form.type}
                onChange={(e) => {
                  const type = e.target.value;
                  const known = KNOWN_TYPES.find((t) => t.value === type);
                  setForm((current) => ({ ...current, type, label: known?.label ?? current.label }));
                }}
              >
                {KNOWN_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Price (USD)">
              <Input value={priceText} onChange={(e) => onPriceChange(e.target.value)} inputMode="decimal" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type label" hint="Shown on the card, e.g. “Baby Onesie”">
              <Input value={form.label} onChange={(e) => set('label', e.target.value)} />
            </Field>
            <Field label="Collection" hint="Optional grouping, e.g. Ghana Spotlight">
              <Input value={form.collection ?? ''} onChange={(e) => set('collection', e.target.value)} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tagline">
              <Input value={form.tagline ?? ''} onChange={(e) => set('tagline', e.target.value)} placeholder="Born on Friday · Akan Heritage" />
            </Field>
            <Field label="Card blurb">
              <Input value={form.cardBlurb ?? ''} onChange={(e) => set('cardBlurb', e.target.value)} placeholder="Ceramic mug · Sankofa" />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
            />
          </Field>

          {/* --- Images --- */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Images</label>
              <Button variant="secondary" icon={<Images className="h-4 w-4" />} onClick={() => setPickerOpen(true)}>
                Choose from library
              </Button>
            </div>
            {form.images.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No images yet. The first one you add becomes the card image.
              </p>
            ) : (
              <ul className="space-y-2">
                {form.images.map((path, index) => (
                  <li
                    key={path}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800"
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
                    <ImageThumb path={path} />
                    <span className="min-w-0 flex-1 truncate text-xs text-slate-500 dark:text-slate-400">{path}</span>
                    <button
                      type="button"
                      title={form.image === path ? 'Card image' : 'Use as the card image'}
                      onClick={() => set('image', path)}
                      className={`rounded p-1.5 ${
                        form.image === path
                          ? 'text-amber-500'
                          : 'text-slate-300 hover:text-amber-500 dark:text-slate-600'
                      }`}
                    >
                      <Star className="h-4 w-4" fill={form.image === path ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      title="Remove"
                      onClick={() => {
                        const remaining = form.images.filter((_, i) => i !== index);
                        setForm((current) => ({
                          ...current,
                          images: remaining,
                          // Dropping the card image promotes the next one rather than
                          // leaving the product with no thumbnail.
                          image: current.image === path ? (remaining[0] ?? '') : current.image,
                        }));
                      }}
                      className="rounded p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ListField
            label="Sizes"
            placeholder="Add a size, e.g. XL or 15oz"
            values={form.sizes}
            onChange={(sizes) => set('sizes', sizes)}
          />
          <ListField
            label="Details"
            placeholder="Add a bullet, e.g. Premium cotton blend"
            values={form.details}
            onChange={(details) => set('details', details)}
          />
          <ListField
            label="Perfect for"
            placeholder="Add a tag, e.g. Birthday Gift"
            values={form.perfectFor}
            onChange={(perfectFor) => set('perfectFor', perfectFor)}
          />

          <SizeChartField values={form.sizeChart} onChange={(rows) => set('sizeChart', rows)} />

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Amazon URL">
              <Input value={form.amazonUrl ?? ''} onChange={(e) => set('amazonUrl', e.target.value)} />
            </Field>
            <Field label="Etsy URL">
              <Input value={form.etsyUrl ?? ''} onChange={(e) => set('etsyUrl', e.target.value)} />
            </Field>
            <Field label="Printify URL">
              <Input value={form.printifyUrl ?? ''} onChange={(e) => set('printifyUrl', e.target.value)} />
            </Field>
          </div>

          <div className="flex flex-wrap gap-5 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Toggle label="Visible on the website" checked={form.active} onChange={(v) => set('active', v)} />
            <Toggle label="Featured" checked={form.featured} onChange={(v) => set('featured', v)} />
            <Toggle label="Sold out" checked={form.soldOut} onChange={(v) => set('soldOut', v)} />
          </div>
        </div>
      </Modal>

      <ImagePicker
        open={pickerOpen}
        initiallySelected={form.images}
        onClose={() => setPickerOpen(false)}
        onConfirm={(paths) =>
          setForm((current) => ({
            ...current,
            images: paths,
            image: paths.includes(current.image ?? '') ? current.image : (paths[0] ?? ''),
          }))
        }
      />
    </>
  );
}

/** Add-and-remove editor for the simple ordered string lists a product carries. */
function ListField({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const value = draft.trim();
    if (!value || values.includes(value)) {
      setDraft('');
      return;
    }
    onChange([...values, value]);
    setDraft('');
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="mb-2 flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button variant="secondary" icon={<Plus className="h-4 w-4" />} onClick={add}>
          Add
        </Button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 py-1 pr-1.5 pl-3 text-xs dark:bg-slate-800"
            >
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                onClick={() => onChange(values.filter((v) => v !== value))}
                className="rounded-full p-0.5 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SizeChartField({
  values,
  onChange,
}: {
  values: SizeChartRow[];
  onChange: (rows: SizeChartRow[]) => void;
}) {
  const blank: SizeChartRow = useMemo(
    () => ({ size: '', usChest: '', euChest: '', usLength: '', euLength: '' }),
    [],
  );

  const update = (index: number, key: keyof SizeChartRow, value: string) =>
    onChange(values.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">Size chart</label>
        <Button variant="secondary" icon={<Plus className="h-4 w-4" />} onClick={() => onChange([...values, blank])}>
          Add row
        </Button>
      </div>
      {values.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          None. Garments usually need one; mugs do not.
        </p>
      ) : (
        <div className="space-y-2">
          {values.map((row, index) => (
            <div key={index} className="grid grid-cols-6 items-center gap-2">
              {(['size', 'usChest', 'euChest', 'usLength', 'euLength'] as const).map((key) => (
                <Input
                  key={key}
                  value={row[key] ?? ''}
                  placeholder={key === 'size' ? 'Size' : key}
                  onChange={(e) => update(index, key, e.target.value)}
                  className="text-xs"
                />
              ))}
              <button
                type="button"
                aria-label="Remove row"
                onClick={() => onChange(values.filter((_, i) => i !== index))}
                className="justify-self-start rounded p-1.5 text-slate-400 hover:text-rose-600"
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

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600"
      />
      {label}
    </label>
  );
}
