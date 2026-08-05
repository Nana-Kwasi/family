import { useEffect, useState } from 'react';
import { AlertTriangle, Eye, EyeOff, FileText, Pencil, Send } from 'lucide-react';
import { errorMessage } from '../../api/client';
import { usePolicies, useSavePolicy, useSetPolicyPublished } from '../../api/culture-hooks';
import type { Policy, PolicyInput, PolicyKind } from '../../api/culture-types';
import { PageHeader } from '../../components/AppLayout';
import { Alert, Badge, Button, Card, Field, Input, Modal, Select, Spinner } from '../../components/ui';

/** Plain-language names — nobody should have to read SHIPPING_RETURNS off a screen. */
const KIND_LABELS: Record<PolicyKind, string> = {
  TERMS: 'Terms of Service',
  PRIVACY: 'Privacy',
  COOKIES: 'Cookies',
  AI_ASSISTANT: 'AI Assistant (Afia)',
  DATA_PROCESSING: 'Data Handling',
  CONTENT_SUBMISSION: 'Visitor Submissions',
  SHIPPING_RETURNS: 'Shipping & Returns',
  MARKETING: 'Email & Marketing',
};

/** Seeded bodies all start this way; publishing one would put placeholder text on the site. */
const DRAFT_MARKER = 'Draft. Replace this';

export function PoliciesPage() {
  const { data: policies, isLoading } = usePolicies();
  const [editing, setEditing] = useState<Policy | null>(null);
  const [confirmPublish, setConfirmPublish] = useState<Policy | null>(null);
  const [error, setError] = useState('');
  const setPublished = useSetPolicyPublished();

  const placeholders = policies?.filter((p) => p.body.startsWith(DRAFT_MARKER)).length ?? 0;
  const liveRequired = policies?.filter((p) => p.published && p.requiredAtSignup).length ?? 0;

  const act = async (policy: Policy, publish: boolean) => {
    setError('');
    try {
      await setPublished.mutateAsync({ id: policy.id, publish });
    } catch (err) {
      setError(errorMessage(err, 'Could not change the policy'));
    }
    setConfirmPublish(null);
  };

  return (
    <>
      <PageHeader
        title="Policies"
        description="What visitors agree to. Edit freely — nothing reaches the website until you publish it."
      />

      {error && <Alert tone="error">{error}</Alert>}

      {/* The two things an operator most needs to know before touching anything. */}
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <Card className="flex items-start gap-3 p-4">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
          <div className="text-sm">
            <p className="font-medium">{liveRequired} policies must be accepted at sign-up</p>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400">
              A new account cannot be created until every one of these is ticked. Publish none and
              sign-up asks for nothing.
            </p>
          </div>
        </Card>

        {placeholders > 0 && (
          <Card className="flex items-start gap-3 border-amber-200 p-4 dark:border-amber-500/30">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div className="text-sm">
              <p className="font-medium">
                {placeholders} still hold placeholder text
              </p>
              <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                These were seeded as drafts. Write the real wording before publishing them —
                published text is what visitors are legally agreeing to.
              </p>
            </div>
          </Card>
        )}
      </div>

      {isLoading && <Spinner label="Loading policies" />}

      <div className="space-y-3">
        {policies?.map((policy) => {
          const isPlaceholder = policy.body.startsWith(DRAFT_MARKER);
          return (
            <Card key={policy.id} className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{policy.title}</h2>
                <span className="text-xs text-slate-400">{KIND_LABELS[policy.kind]}</span>

                {policy.published ? (
                  <Badge tone="green">Live · v{policy.version}</Badge>
                ) : (
                  <Badge tone="slate">Draft</Badge>
                )}
                {policy.requiredAtSignup && <Badge tone="blue">Required at sign-up</Badge>}
                {isPlaceholder && <Badge tone="amber">Placeholder text</Badge>}

                <span className="ml-auto text-xs text-slate-400">
                  {policy.updatedBy ? `edited by ${policy.updatedBy} · ` : ''}
                  {new Date(policy.updatedAt).toLocaleDateString()}
                </span>
              </div>

              {policy.summary && (
                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{policy.summary}</p>
              )}
              <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{policy.body}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" icon={<Pencil className="h-4 w-4" />} onClick={() => setEditing(policy)}>
                  Edit
                </Button>

                {policy.published ? (
                  <>
                    <Button
                      variant="secondary"
                      icon={<Send className="h-4 w-4" />}
                      onClick={() => setConfirmPublish(policy)}
                    >
                      Publish changes (v{policy.version + 1})
                    </Button>
                    <Button variant="ghost" icon={<EyeOff className="h-4 w-4" />} onClick={() => act(policy, false)}>
                      Take off the site
                    </Button>
                  </>
                ) : (
                  <Button icon={<Eye className="h-4 w-4" />} onClick={() => setConfirmPublish(policy)}>
                    Publish
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <PolicyEditor policy={editing} onClose={() => setEditing(null)} />

      <Modal
        open={confirmPublish !== null}
        title={confirmPublish?.published ? 'Publish changes' : 'Publish policy'}
        onClose={() => setConfirmPublish(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmPublish(null)}>
              Cancel
            </Button>
            <Button
              loading={setPublished.isPending}
              onClick={() => confirmPublish && act(confirmPublish, true)}
            >
              Publish
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Publishing <strong>{confirmPublish?.title}</strong> makes the current text live
          {confirmPublish?.published && <> as <strong>version {confirmPublish.version + 1}</strong></>}.
        </p>
        {confirmPublish?.published && (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Anyone who accepted version {confirmPublish.version} is recorded against that version,
            not this one — their consent covered the old wording.
          </p>
        )}
        {confirmPublish?.body.startsWith(DRAFT_MARKER) && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
            This policy still contains placeholder text. Publishing it puts that wording on the
            website as the thing visitors agree to.
          </p>
        )}
      </Modal>
    </>
  );
}

function PolicyEditor({ policy, onClose }: { policy: Policy | null; onClose: () => void }) {
  const [form, setForm] = useState<PolicyInput>({ title: '', summary: '', body: '', requiredAtSignup: true });
  const [error, setError] = useState('');
  const save = useSavePolicy();

  useEffect(() => {
    if (!policy) return;
    setError('');
    setForm({
      title: policy.title,
      summary: policy.summary ?? '',
      body: policy.body,
      requiredAtSignup: policy.requiredAtSignup,
      sortOrder: policy.sortOrder,
    });
  }, [policy]);

  const submit = async () => {
    if (!policy) return;
    setError('');
    if (!form.body.trim()) {
      setError('A policy needs a body.');
      return;
    }
    try {
      await save.mutateAsync({ id: policy.id, input: form });
      onClose();
    } catch (err) {
      setError(errorMessage(err, 'Could not save'));
    }
  };

  return (
    <Modal
      open={policy !== null}
      wide
      title={policy ? `Edit — ${policy.title}` : ''}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={save.isPending}>
            Save draft
          </Button>
        </>
      }
    >
      {error && <Alert tone="error">{error}</Alert>}

      <div className="space-y-4">
        {policy?.published && (
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            This policy is live as version {policy.version}. Saving here does not change what
            visitors see — publish when the new wording is ready.
          </p>
        )}

        <Field label="Title">
          <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
        </Field>

        <Field label="Summary" hint="One line, shown beside the tick box on the sign-up form">
          <Input
            value={form.summary ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
            placeholder="What we collect, why, and what we never do with it."
          />
        </Field>

        <Field label="Full text" hint="What a visitor reads when they open this policy">
          <textarea
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={16}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-[13px] leading-relaxed outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </Field>

        <Field label="At sign-up">
          <Select
            value={form.requiredAtSignup ? 'required' : 'optional'}
            onChange={(e) => setForm((f) => ({ ...f, requiredAtSignup: e.target.value === 'required' }))}
          >
            <option value="required">Must be accepted to create an account</option>
            <option value="optional">Shown on the site, not asked for at sign-up</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
