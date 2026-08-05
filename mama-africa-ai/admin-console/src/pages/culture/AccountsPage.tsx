import { useState } from 'react';
import { useCustomerAccounts } from '../../api/culture-hooks';
import { PageHeader } from '../../components/AppLayout';
import { Badge, Card, EmptyState, Pagination, Spinner, Table } from '../../components/ui';

/** Website accounts — read-only. See CustomerAdminController for why. */
export function AccountsPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useCustomerAccounts(page);

  return (
    <>
      <PageHeader
        title="Website accounts"
        description="People who signed up on the site. Separate from the console operators under Users."
      />

      <Card>
        {isLoading && <Spinner label="Loading accounts" />}

        {!isLoading && data && data.content.length === 0 && (
          <EmptyState title="No accounts yet" description="Sign-ups from the website appear here." />
        )}

        {!isLoading && data && data.content.length > 0 && (
          <>
            <Table headers={['Name', 'Email', 'Akan name', 'Day born', 'Joined']}>
              {data.content.map((account) => (
                <tr key={account.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium">{account.fullName}</td>
                  <td className="px-4 py-3">{account.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {account.akanName ? <Badge tone="blue">{account.akanName}</Badge> : '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{account.dayBorn ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {new Date(account.createdAt).toLocaleDateString()}
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
