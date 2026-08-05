import { useEffect, useState } from 'react';
import { Check, ImageOff, Search } from 'lucide-react';
import { useImageLibrary } from '../api/market-hooks';
import { siteImageUrl } from '../api/siteAssets';
import { Button, Input, Modal, Spinner } from './ui';

/**
 * Browses the website's image folder and returns the paths an admin picks.
 *
 * Multi-select, because a product's gallery is usually several shots of the same item and
 * choosing them one dialog at a time is tedious.
 */
export function ImagePicker({
  open,
  onClose,
  onConfirm,
  initiallySelected = [],
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (paths: string[]) => void;
  initiallySelected?: string[];
}) {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [selected, setSelected] = useState<string[]>(initiallySelected);

  useEffect(() => {
    if (open) setSelected(initiallySelected);
    // initiallySelected is a fresh array each render; keying off `open` is what we want —
    // the selection resets when the dialog is opened, not on every parent re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useImageLibrary(debounced, open);

  const toggle = (path: string) =>
    setSelected((current) =>
      current.includes(path) ? current.filter((p) => p !== path) : [...current, path],
    );

  return (
    <Modal
      open={open}
      wide
      title="Choose images"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(selected);
              onClose();
            }}
          >
            Use {selected.length || 'no'} image{selected.length === 1 ? '' : 's'}
          </Button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filter by file name, e.g. kofi or sunday-borns"
            className="pl-9"
          />
        </div>
      </div>

      {isLoading && <Spinner label="Reading the image folder" />}

      {!isLoading && data && !data.available && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <p className="font-medium">The image folder is not configured.</p>
          <p className="mt-1">
            Set <code className="font-mono text-xs">MARKET_IMAGE_ROOT</code> on the backend to the
            website&rsquo;s <code className="font-mono text-xs">public/images</code> folder, then restart
            it. You can still type image paths by hand.
          </p>
        </div>
      )}

      {!isLoading && data?.available && data.images.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No images match &ldquo;{debounced}&rdquo;.
        </p>
      )}

      {!isLoading && data && data.images.length > 0 && (
        <div className="grid max-h-[45vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4">
          {data.images.map((path) => {
            const isSelected = selected.includes(path);
            return (
              <button
                key={path}
                type="button"
                onClick={() => toggle(path)}
                title={path}
                className={`group relative overflow-hidden rounded-lg border-2 text-left transition-colors ${
                  isSelected
                    ? 'border-brand-500'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                }`}
              >
                <div className="flex aspect-square items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <img
                    src={siteImageUrl(path)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <p className="truncate px-2 py-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {path.split('/').pop()}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </Modal>
  );
}

/** Square thumbnail with a graceful fallback — image paths can go stale as assets move. */
export function ImageThumb({ path, size = 40 }: { path: string | null; size?: number }) {
  const [failed, setFailed] = useState(false);
  const url = siteImageUrl(path);

  if (!url || failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-md bg-slate-100 text-slate-400 dark:bg-slate-800"
      >
        <ImageOff className="h-4 w-4" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt=""
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      className="rounded-md bg-slate-100 object-contain dark:bg-slate-800"
    />
  );
}
