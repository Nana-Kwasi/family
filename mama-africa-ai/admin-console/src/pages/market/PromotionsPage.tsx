import { useEffect, useState } from 'react';
import { Pencil, Plus, Power, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/client';
import {
  useDeletePromotion,
  usePromotions,
  useSavePromotion,
  useSetPromotionActive,
} from '../../api/market-hooks';
import {
  BORN_DAYS,
  type Promotion,
  type PromotionInput,
  type PromotionPlacement,
  type PromotionTarget,
} from '../../api/market-types';
import { PageHeader } from '../../components/AppLayout';
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
  Table,
} from '../../components/ui';

const PLACEMENTS: { value: PromotionPlacement; label: string; hint: string }[] = [
  { value: 'ANNOUNCEMENT_STRIP', label: 'Announcement strip', hint: 'The bar across the top of every page' },
  { value: 'STORE_HERO', label: 'Store hero', hint: 'The large panel at the head of the store' },
  { value: 'PRODUCT_BADGE', label: 'Product badge', hint: 'A small flag on matching product cards' },
  { value: 'WELCOME_POPUP', label: 'Welcome pop-up', hint: 'Shown to first-time visitors' },
];

const TARGETS: { value: PromotionTarget | ''; label: string }[] = [
  { value: '', label: 'Whole site' },
  { value: 'BORN_DAY', label: 'A day born' },
  { value: 'PRODUCT_TYPE', label: 'A product type' },
  { value: 'COLLECTION', label: 'A collection' },
  { value: 'PRODUCT', label: 'One product (slug)' },
  { value: 'BUNDLE', label: 'One bundle (slug)' },
];

const EMPTY: PromotionInput = {
  headline: '',
  body: '',
  badgeLabel: '',
  placement: 'ANNOUNCEMENT_STRIP',
  ctaLabel: '',
  ctaUrl: '',
  targetType: null,
  targetValue: '',
  discountPct: null,
  startsAt: null,
  endsAt: null,
  active: true,
};

export function PromotionsPage() {
  const { data: promotions, isLoading } = usePromotions();
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Promotion | null>(null);
  const [error, setError] = useState('');
  const setActive = useSetPromotionActive();
  const remove = useDeletePromotion();

  return (
    <>
      <PageHeader
        title="Promotions"
        description="Campaign messages on the website. A promotion shows only while it is switched on and inside its dates."
        actions={
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreating(true)}>
            New promotion
          </Button>
        }
      />

      {error && <Alert tone="error">{error}</Alert>}

      <Card>
        {isLoading && <Spinner label="Loading promotions" />}

        {!isLoading && promotions && promotions.length === 0 && (
          <EmptyState
            title="No promotions yet"
            description="Create one to put a message on the announcement strip or the store hero."
          />
        )}

        {!isLoading && promotions && promotions.length > 0 && (
          <Table headers={['Headline', 'Placement', 'Applies to', 'Window', 'Status', '']}>
            {promotions.map((promotion) => (
              <tr key={promotion.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3">
                  <p className="font-medium">{promotion.headline}</p>
                  {promotion.discountPct != null && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{promotion.discountPct}% off</p>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {PLACEMENTS.find((p) => p.value === promotion.placement)?.label ?? promotion.placement}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {promotion.targetType ? `${promotion.targetType}: ${promotion.targetValue}` : 'Whole site'}
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                  {formatWindow(promotion)}
                </td>
                <td className="px-4 py-3">
                  {promotion.live ? (
                    <Badge tone="green">Live</Badge>
                  ) : promotion.active ? (
                    <Badge tone="amber">Scheduled</Badge>
                  ) : (
                    <Badge tone="slate">Off</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      title={promotion.active ? 'Switch off' : 'Switch on'}
                      onClick={async () => {
                        setError('');
                        try {
                          await setActive.mutateAsync({ id: promotion.id, active: !promotion.active });
                        } catch (err) {
                          setError(errorMessage(err, 'Could not change the promotion'));
                        }
                      }}
                      className={`rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        promotion.active ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      <Power className="h-4 w-4" />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => setEditing(promotion)}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => setConfirmDelete(promotion)}
                      className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <PromotionEditor
        open={creating || editing !== null}
        promotion={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
      />

      <Modal
        open={confirmDelete !== null}
        title="Delete promotion"
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
                  setError(errorMessage(err, 'Could not delete the promotion'));
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
          Delete <strong>{confirmDelete?.headline}</strong>? To pause it instead, switch it off.
        </p>
      </Modal>
    </>
  );
}

function formatWindow(promotion: Promotion): string {
  const format = (value: string | null) =>
    value ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : null;
  const from = format(promotion.startsAt);
  const to = format(promotion.endsAt);
  if (!from && !to) return 'Always';
  if (from && to) return `${from} – ${to}`;
  return from ? `From ${from}` : `Until ${to}`;
}

/** datetime-local wants "YYYY-MM-DDTHH:mm" in local time; the API speaks UTC instants. */
function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function fromLocalInput(value: string): string | null {
  return value ? new Date(value).toISOString() : null;
}

function PromotionEditor({
  open,
  promotion,
  onClose,
}: {
  open: boolean;
  promotion: Promotion | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PromotionInput>(EMPTY);
  const [error, setError] = useState('');
  const save = useSavePromotion();

  useEffect(() => {
    if (!open) return;
    setError('');
    setForm(
      promotion
        ? {
            headline: promotion.headline,
            slug: promotion.slug,
            body: promotion.body ?? '',
            badgeLabel: promotion.badgeLabel ?? '',
            placement: promotion.placement,
            ctaLabel: promotion.ctaLabel ?? '',
            ctaUrl: promotion.ctaUrl ?? '',
            targetType: promotion.targetType,
            targetValue: promotion.targetValue ?? '',
            discountPct: promotion.discountPct,
            startsAt: promotion.startsAt,
            endsAt: promotion.endsAt,
            active: promotion.active,
            sortOrder: promotion.sortOrder,
          }
        : EMPTY,
    );
  }, [open, promotion]);

  const set = <K extends keyof PromotionInput>(key: K, value: PromotionInput[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async () => {
    setError('');
    if (!form.headline.trim()) {
      setError('A promotion needs a headline.');
      return;
    }
    if (form.targetType && !form.targetValue?.trim()) {
      setError('Choose what this promotion applies to, or set it to the whole site.');
      return;
    }
    try {
      await save.mutateAsync({
        id: promotion?.id ?? null,
        input: {
          ...form,
          headline: form.headline.trim(),
          targetValue: form.targetType ? form.targetValue?.trim() : null,
        },
      });
      onClose();
    } catch (err) {
      setError(errorMessage(err, 'Could not save the promotion'));
    }
  };

  const placement = PLACEMENTS.find((p) => p.value === form.placement);

  return (
    <Modal
      open={open}
      wide
      title={promotion ? `Edit — ${promotion.headline}` : 'New promotion'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={save.isPending}>
            {promotion ? 'Save changes' : 'Create promotion'}
          </Button>
        </>
      }
    >
      {error && <Alert tone="error">{error}</Alert>}

      <div className="space-y-4">
        <Field label="Headline">
          <Input
            value={form.headline}
            onChange={(e) => set('headline', e.target.value)}
            placeholder="LIMITED BUNDLES: SIGNATURE · EVERYDAY · LEGACY"
          />
        </Field>

        <Field label="Body" hint="Optional supporting line, used by the hero and pop-up placements">
          <textarea
            value={form.body ?? ''}
            onChange={(e) => set('body', e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </Field>

        <Field label="Placement" hint={placement?.hint}>
          <Select
            value={form.placement}
            onChange={(e) => set('placement', e.target.value as PromotionPlacement)}
          >
            {PLACEMENTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Applies to">
            <Select
              value={form.targetType ?? ''}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  targetType: (e.target.value || null) as PromotionTarget | null,
                  targetValue: '',
                }))
              }
            >
              {TARGETS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>

          {form.targetType && (
            <Field label="Which one">
              {form.targetType === 'BORN_DAY' ? (
                <Select value={form.targetValue ?? ''} onChange={(e) => set('targetValue', e.target.value)}>
                  <option value="">Choose a day</option>
                  {BORN_DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
              ) : form.targetType === 'PRODUCT_TYPE' ? (
                <Select value={form.targetValue ?? ''} onChange={(e) => set('targetValue', e.target.value)}>
                  <option value="">Choose a type</option>
                  <option value="tshirt">T-Shirts</option>
                  <option value="mug">Mugs</option>
                  <option value="babysuit">Baby Onesies</option>
                  <option value="hoodie">Hoodies</option>
                </Select>
              ) : (
                <Input
                  value={form.targetValue ?? ''}
                  onChange={(e) => set('targetValue', e.target.value)}
                  placeholder={form.targetType === 'COLLECTION' ? 'Ghana Spotlight' : 'slug'}
                />
              )}
            </Field>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Badge label" hint="Short flag on cards">
            <Input
              value={form.badgeLabel ?? ''}
              onChange={(e) => set('badgeLabel', e.target.value)}
              placeholder="NEW"
            />
          </Field>
          <Field label="Discount %" hint="Display only">
            <Input
              type="number"
              min={0}
              max={100}
              value={form.discountPct ?? ''}
              onChange={(e) => set('discountPct', e.target.value === '' ? null : Number(e.target.value))}
            />
          </Field>
          <Field label="Visibility">
            <Select
              value={form.active ? 'on' : 'off'}
              onChange={(e) => set('active', e.target.value === 'on')}
            >
              <option value="on">Switched on</option>
              <option value="off">Switched off</option>
            </Select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Starts" hint="Leave blank to start immediately">
            <Input
              type="datetime-local"
              value={toLocalInput(form.startsAt ?? null)}
              onChange={(e) => set('startsAt', fromLocalInput(e.target.value))}
            />
          </Field>
          <Field label="Ends" hint="Leave blank to run until switched off">
            <Input
              type="datetime-local"
              value={toLocalInput(form.endsAt ?? null)}
              onChange={(e) => set('endsAt', fromLocalInput(e.target.value))}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Call to action">
            <Input
              value={form.ctaLabel ?? ''}
              onChange={(e) => set('ctaLabel', e.target.value)}
              placeholder="Shop the set"
            />
          </Field>
          <Field label="Link">
            <Input
              value={form.ctaUrl ?? ''}
              onChange={(e) => set('ctaUrl', e.target.value)}
              placeholder="/store"
            />
          </Field>
        </div>
      </div>
    </Modal>
  );
}
