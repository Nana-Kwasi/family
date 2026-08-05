import { useState } from 'react';
import { useSubscribers } from '../../api/culture-hooks';
import { PageHeader } from '../../components/AppLayout';
import { Card, EmptyState, Pagination, Spinner, Table } from '../../components/ui';

export function SubscribersPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useSubscribers(page);

  return (
    <>
      <PageHeader
        title="Subscribers"
        description="Emails captured by the newsletter cards across the website."
      />

      <Card>
        {isLoading && <Spinner label="Loading subscribers" />}

        {!isLoading && data && data.content.length === 0 && (
          <EmptyState title="No subscribers yet" description="Sign-ups appear here as they come in." />
        )}

        {!isLoading && data && data.content.length > 0 && (
          <>
            <Table headers={['Email', 'Akan name', 'Day born', 'Source', 'Joined']}>
              {data.content.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium">{subscriber.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{subscriber.akanName ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{subscriber.dayBorn ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{subscriber.source ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {new Date(subscriber.createdAt).toLocaleDateString()}
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
    </>
  );
}
