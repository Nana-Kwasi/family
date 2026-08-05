import { Link } from 'react-router';
import { BookOpen, Inbox, MessageSquareQuote, Star } from 'lucide-react';
import { useCultureOverview } from '../../api/culture-hooks';
import { PageHeader } from '../../components/AppLayout';
import { Card, Spinner } from '../../components/ui';

export function CultureOverviewPage() {
  const { data, isLoading } = useCultureOverview();

  return (
    <>
      <PageHeader
        title="Mama Africa Culture"
        description="Stories, proverbs and everything visitors send in. All of it used to be posted from the website itself."
      />

      {isLoading && <Spinner label="Loading" />}

      {!isLoading && data && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile to="/culture/stories" icon={<BookOpen className="h-5 w-5" />} label="Stories" value={data.stories} />
            <Tile
              to="/culture/stories"
              icon={<MessageSquareQuote className="h-5 w-5" />}
              label="Proverbs"
              value={data.proverbs}
            />
            <Tile
              to="/culture/submissions"
              icon={<Inbox className="h-5 w-5" />}
              label="Diaspora stories"
              value={data.diasporaTotal}
            />
            <Tile
              to="/culture/submissions"
              icon={<Star className="h-5 w-5" />}
              label="Ratings"
              value={data.reviewsTotal}
            />
          </div>

          <Card className="p-5">
            <h2 className="mb-2 text-sm font-semibold">How publishing works here</h2>
            <ul className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <strong className="text-slate-700 dark:text-slate-300">{data.published}</strong> of your posts are
                live on the website. Unpublishing hides one without deleting it.
              </li>
              <li>
                Visitor submissions — diaspora stories and ratings — appear on the site as soon as they are sent,
                exactly as before. <Link to="/culture/submissions" className="text-brand-600 hover:underline dark:text-brand-400">Submissions</Link>{' '}
                is where you take one down.
              </li>
              <li>
                <Link to="/culture/subscribers" className="text-brand-600 hover:underline dark:text-brand-400">
                  Subscribers
                </Link>{' '}
                lists everyone who joined through the newsletter cards.
              </li>
            </ul>
          </Card>
        </>
      )}
    </>
  );
}

function Tile({
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
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Link>
  );
}
