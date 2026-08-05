import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { useChangePassword } from '../api/hooks';
import { errorMessage } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { PageHeader } from '../components/AppLayout';
import { Alert, Badge, Button, Card, Field, Input } from '../components/ui';
import { formatDate } from '../components/format';

export function ProfilePage() {
  const { user } = useAuth();
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match');
      return;
    }

    try {
      await changePassword.mutateAsync({ currentPassword, newPassword });
      setSuccess('Password updated. It applies the next time you sign in.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      setError(errorMessage(e, 'Could not change the password'));
    }
  };

  return (
    <>
      <PageHeader title="Profile" description="Your account details." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold">Account</h2>
          <dl className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="text-sm font-medium">{user?.fullName ?? '—'}</dd>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="text-sm font-medium">{user?.email}</dd>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Role</dt>
              <dd>
                <Badge tone={user?.role === 'SUPER_ADMIN' ? 'blue' : 'slate'}>
                  {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-slate-500 dark:text-slate-400">Member since</dt>
              <dd className="text-sm font-medium">{user && formatDate(user.createdAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold">Change password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert tone="error">{error}</Alert>}
            {success && <Alert tone="success">{success}</Alert>}

            <Field label="Current password">
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Field>
            <Field label="New password" hint="At least 8 characters.">
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>
            <Field label="Confirm new password">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </Field>

            <Button type="submit" loading={changePassword.isPending} icon={<KeyRound className="h-4 w-4" />}>
              Update password
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
