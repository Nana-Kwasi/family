import { Link } from 'react-router';
import { BadgePercent, Boxes, EyeOff, Package, TriangleAlert } from 'lucide-react';
import { useBundles, useProducts, usePromotions } from '../../api/market-hooks';
import { PageHeader } from '../../components/AppLayout';
import { ImageThumb } from '../../components/ImagePicker';
import { Badge, Card, Spinner } from '../../components/ui';

export function MarketOverviewPage() {
  // Three cheap count queries — size 1 for the totals, plus a small recent list.
  const all = useProducts({ page: 0, size: 1 });
  const hidden = useProducts({ page: 0, size: 1, active: false });
  const recent = useProducts({ page: 0, size: 6 });
  const bundles = useBundles();
  const promotions = usePromotions();

  const loading = all.isLoading || bundles.isLoading || promotions.isLoading;
  const livePromotions = promotions.data?.filter((p) => p.live).length ?? 0;

  return (
    <>
      <PageHeader
        title="Mama Africa Market"
        description="The website's shop. Products, bundles and promotions are all edited here."
      />

      {loading && <Spinner label="Loading the shop" />}

      {!loading && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              to="/market/products"
              icon={<Package className="h-5 w-5" />}
              label="Products"
              value={all.data?.totalElements ?? 0}
            />
            <StatTile
              to="/market/products"
              icon={<EyeOff className="h-5 w-5" />}
              label="Hidden"
              value={hidden.data?.totalElements ?? 0}
            />
            <StatTile
              to="/market/bundles"
              icon={<Boxes className="h-5 w-5" />}
              label="Bundles"
              value={bundles.data?.length ?? 0}
            />
            <StatTile
              to="/market/promotions"
              icon={<BadgePercent className="h-5 w-5" />}
              label="Promotions live"
              value={livePromotions}
            />
          </div>

          {promotions.data && promotions.data.length > 0 && livePromotions === 0 && (
            <Card className="mb-6 flex items-start gap-3 border-amber-200 p-4 dark:border-amber-500/30">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div className="text-sm">
                <p className="font-medium">No promotion is showing on the website.</p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Every promotion is either switched off or outside its date window.{' '}
                  <Link to="/market/promotions" className="text-brand-600 hover:underline dark:text-brand-400">
                    Review promotions
                  </Link>
                </p>
              </div>
            </Card>
          )}

          <Card>
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-sm font-semibold">Recently updated</h2>
            </div>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recent.data?.content.map((product) => (
                <li key={product.id} className="flex items-center gap-3 px-5 py-3">
                  <ImageThumb path={product.image} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {product.bornDay ? `${product.bornDay} · ` : ''}
                      {product.label} · ${(product.priceCents / 100).toFixed(2)}
                    </p>
                  </div>
                  {!product.active && <Badge tone="slate">Hidden</Badge>}
                  {product.soldOut && <Badge tone="amber">Sold out</Badge>}
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </>
  );
}

function StatTile({
  to,
  icon,
  label,
  value,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Link
      to={to}
      className="surface flex items-center gap-4 p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Link>
  );
}
