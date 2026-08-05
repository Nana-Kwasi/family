import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '../api/hooks';
import { errorMessage } from '../api/client';
import type { Role, User } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { PageHeader } from '../components/AppLayout';
import { Alert, Badge, Button, Card, Field, Input, Modal, Select, Spinner, Table } from '../components/ui';
import { formatDate } from '../components/format';

export function UsersPage() {
  const { user: currentUser, isSuperAdmin } = useAuth();
  const users = useUsers(isSuperAdmin);
  const deleteUser = useDeleteUser();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [error, setError] = useState('');

  if (!isSuperAdmin) {
    return (
      <>
        <PageHeader title="Users" />
        <Alert tone="error">Only a super admin can manage accounts.</Alert>
      </>
    );
  }

  const handleDelete = async () => {
    if (!deleting) return;
    setError('');
    try {
      await deleteUser.mutateAsync(deleting.id);
      setDeleting(null);
    } catch (e) {
      setError(errorMessage(e, 'Could not delete the account'));
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        description="Admin accounts with access to this console."
        actions={
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreating(true)}>
            New admin
          </Button>
        }
      />

      {error && (
        <div className="mb-4">
          <Alert tone="error">{error}</Alert>
        </div>
      )}

      <Card>
        {users.isLoading ? (
          <Spinner />
        ) : users.error ? (
          <div className="p-4">
            <Alert tone="error">{errorMessage(users.error)}</Alert>
          </div>
        ) : (
          <Table headers={['Name', 'Email', 'Role', 'Status', 'Created', '']}>
            {users.data?.map((user) => {
              const isSelf = user.id === currentUser?.id;
              return (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium">
                    {user.fullName ?? '—'}
                    {isSelf && <span className="ml-2 text-xs text-slate-500">(you)</span>}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={user.role === 'SUPER_ADMIN' ? 'blue' : 'slate'}>
                      {user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {user.enabled ? <Badge tone="green">Active</Badge> : <Badge tone="red">Disabled</Badge>}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" aria-label="Edit" onClick={() => setEditing(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        aria-label="Delete"
                        disabled={isSelf}
                        title={isSelf ? 'You cannot delete your own account' : 'Delete'}
                        onClick={() => setDeleting(user)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>

      <CreateUserModal open={creating} onClose={() => setCreating(false)} />
      <EditUserModal user={editing} onClose={() => setEditing(null)} isSelf={editing?.id === currentUser?.id} />

      <Modal
        open={Boolean(deleting)}
        title="Delete account"
        onClose={() => setDeleting(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteUser.isPending} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Remove access for <strong>{deleting?.email}</strong>?
        </p>
      </Modal>
    </>
  );
}

function CreateUserModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const create = useCreateUser();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('ADMIN');
  const [error, setError] = useState('');

  const close = () => {
    setEmail('');
    setFullName('');
    setPassword('');
    setRole('ADMIN');
    setError('');
    onClose();
  };

  const handleSave = async () => {
    setError('');
    try {
      await create.mutateAsync({ email, fullName, password, role });
      close();
    } catch (e) {
      setError(errorMessage(e, 'Could not create the account'));
    }
  };

  return (
    <Modal
      open={open}
      title="New admin"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            loading={create.isPending}
            disabled={!email || !fullName || password.length < 8}
            onClick={handleSave}
          >
            Create
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <Alert tone="error">{error}</Alert>}
        <Field label="Full name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password" hint="At least 8 characters.">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Field label="Role" hint="Super admins can manage other accounts.">
          <Select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}

function EditUserModal({
  user,
  onClose,
  isSelf,
}: {
  user: User | null;
  onClose: () => void;
  isSelf: boolean;
}) {
  const update = useUpdateUser();
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('ADMIN');
  const [enabled, setEnabled] = useState(true);
  const [initialised, setInitialised] = useState<number | null>(null);
  const [error, setError] = useState('');

  if (user && initialised !== user.id) {
    setInitialised(user.id);
    setFullName(user.fullName ?? '');
    setRole(user.role);
    setEnabled(user.enabled);
  }

  const close = () => {
    setInitialised(null);
    setError('');
    onClose();
  };

  const handleSave = async () => {
    if (!user) return;
    setError('');
    try {
      await update.mutateAsync({ id: user.id, fullName, role, enabled });
      close();
    } catch (e) {
      setError(errorMessage(e, 'Could not update the account'));
    }
  };

  return (
    <Modal
      open={Boolean(user)}
      title="Edit admin"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button loading={update.isPending} disabled={!fullName.trim()} onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <Alert tone="error">{error}</Alert>}
        <Field label="Full name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field
          label="Role"
          hint={isSelf ? 'You cannot change your own role.' : undefined}
        >
          <Select value={role} disabled={isSelf} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </Select>
        </Field>
        <Field label="Status" hint={isSelf ? 'You cannot disable your own account.' : undefined}>
          <Select
            value={enabled ? 'true' : 'false'}
            disabled={isSelf}
            onChange={(e) => setEnabled(e.target.value === 'true')}
          >
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
