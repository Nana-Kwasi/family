import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { api } from './client';
import type { Page } from './types';
import type {
  CultureOverview,
  DiasporaStory,
  ModerationStatus,
  Review,
  ReviewSubject,
  Story,
  StoryInput,
  StoryKind,
  StorySummary,
  Subscriber,
  SupportMessage,
  SupportStatus,
  CustomerAccount,
  Policy,
  PolicyInput,
} from './culture-types';

const BASE = '/api/culture/admin';

export const cultureKeys = {
  overview: ['culture-overview'] as const,
  stories: (params: unknown) => ['culture-stories', params] as const,
  story: (id: number) => ['culture-story', id] as const,
  diaspora: (params: unknown) => ['culture-diaspora', params] as const,
  reviews: (params: unknown) => ['culture-reviews', params] as const,
  subscribers: (page: number) => ['culture-subscribers', page] as const,
};

/** Any moderation action changes a count on the overview, so refresh it alongside. */
function invalidate(client: QueryClient, prefix: string) {
  void client.invalidateQueries({ queryKey: [prefix] });
  void client.invalidateQueries({ queryKey: cultureKeys.overview });
}

export function useCultureOverview() {
  return useQuery({
    queryKey: cultureKeys.overview,
    queryFn: async () => (await api.get<CultureOverview>(`${BASE}/overview`)).data,
  });
}

// --- Stories ----------------------------------------------------------------

export interface StoryParams {
  search?: string;
  kind?: StoryKind;
  published?: boolean;
  page: number;
  size: number;
}

export function useStories(params: StoryParams) {
  return useQuery({
    queryKey: cultureKeys.stories(params),
    queryFn: async () => {
      const query: Record<string, string | number | boolean> = {
        page: params.page,
        size: params.size,
      };
      if (params.search?.trim()) query.search = params.search.trim();
      if (params.kind) query.kind = params.kind;
      if (params.published !== undefined) query.published = params.published;
      return (await api.get<Page<StorySummary>>(`${BASE}/stories`, { params: query })).data;
    },
    placeholderData: (previous) => previous,
  });
}

export function useStory(id: number | null) {
  return useQuery({
    queryKey: cultureKeys.story(id ?? 0),
    queryFn: async () => (await api.get<Story>(`${BASE}/stories/${id}`)).data,
    enabled: id !== null,
  });
}

export function useSaveStory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number | null; input: StoryInput }) =>
      id === null
        ? (await api.post<Story>(`${BASE}/stories`, input)).data
        : (await api.put<Story>(`${BASE}/stories/${id}`, input)).data,
    onSuccess: (story) => {
      invalidate(client, 'culture-stories');
      void client.invalidateQueries({ queryKey: cultureKeys.story(story.id) });
    },
  });
}

export function useSetStoryPublished() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) =>
      (await api.put<Story>(`${BASE}/stories/${id}/published`, null, { params: { published } })).data,
    onSuccess: () => invalidate(client, 'culture-stories'),
  });
}

export function useDeleteStory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${BASE}/stories/${id}`);
    },
    onSuccess: () => invalidate(client, 'culture-stories'),
  });
}

// --- Diaspora submissions ---------------------------------------------------

export function useDiasporaStories(status: ModerationStatus | undefined, page: number) {
  return useQuery({
    queryKey: cultureKeys.diaspora({ status, page }),
    queryFn: async () =>
      (
        await api.get<Page<DiasporaStory>>(`${BASE}/diaspora-stories`, {
          params: status ? { status, page, size: 25 } : { page, size: 25 },
        })
      ).data,
    placeholderData: (previous) => previous,
  });
}

export function useModerateDiasporaStory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: ModerationStatus }) =>
      (await api.put<DiasporaStory>(`${BASE}/diaspora-stories/${id}/status`, null, { params: { status } }))
        .data,
    onSuccess: () => invalidate(client, 'culture-diaspora'),
  });
}

export function useDeleteDiasporaStory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${BASE}/diaspora-stories/${id}`);
    },
    onSuccess: () => invalidate(client, 'culture-diaspora'),
  });
}

// --- Reviews ----------------------------------------------------------------

export function useReviews(subject: ReviewSubject | undefined, status: ModerationStatus | undefined, page: number) {
  return useQuery({
    queryKey: cultureKeys.reviews({ subject, status, page }),
    queryFn: async () => {
      const params: Record<string, string | number> = { page, size: 25 };
      if (subject) params.subject = subject;
      if (status) params.status = status;
      return (await api.get<Page<Review>>(`${BASE}/reviews`, { params })).data;
    },
    placeholderData: (previous) => previous,
  });
}

export function useModerateReview() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: ModerationStatus }) =>
      (await api.put<Review>(`${BASE}/reviews/${id}/status`, null, { params: { status } })).data,
    onSuccess: () => invalidate(client, 'culture-reviews'),
  });
}

export function useDeleteReview() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${BASE}/reviews/${id}`);
    },
    onSuccess: () => invalidate(client, 'culture-reviews'),
  });
}

// --- Subscribers ------------------------------------------------------------

export function useSubscribers(page: number) {
  return useQuery({
    queryKey: cultureKeys.subscribers(page),
    queryFn: async () =>
      (await api.get<Page<Subscriber>>(`${BASE}/subscribers`, { params: { page, size: 50 } })).data,
    placeholderData: (previous) => previous,
  });
}

// --- Support inbox and website accounts -------------------------------------
// Grouped with Culture because that is the module an operator reaches them from; both are
// visitor-facing surfaces rather than anything to do with the shop or the assistant.

export function useSupportMessages(status: SupportStatus | undefined, page: number) {
  return useQuery({
    queryKey: ['support-messages', { status, page }],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, size: 25 };
      if (status) params.status = status;
      return (await api.get<Page<SupportMessage>>('/api/support/admin/messages', { params })).data;
    },
    placeholderData: (previous) => previous,
  });
}

export function useResolveSupportMessage() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: SupportStatus }) =>
      (await api.put<SupportMessage>(`/api/support/admin/messages/${id}/status`, null, { params: { status } })).data,
    onSuccess: () => client.invalidateQueries({ queryKey: ['support-messages'] }),
  });
}

export function useDeleteSupportMessage() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/support/admin/messages/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['support-messages'] }),
  });
}

export function useCustomerAccounts(page: number) {
  return useQuery({
    queryKey: ['customer-accounts', page],
    queryFn: async () =>
      (await api.get<Page<CustomerAccount>>('/api/customers', { params: { page, size: 50 } })).data,
    placeholderData: (previous) => previous,
  });
}

// --- Policies ---------------------------------------------------------------
// Editing and publishing are separate on purpose: saving a draft must never quietly change
// what visitors are agreeing to. Publishing is the deliberate act, and it mints a version.

export function usePolicies() {
  return useQuery({
    queryKey: ['policies'],
    queryFn: async () => (await api.get<Policy[]>('/api/policies/admin')).data,
  });
}

export function useSavePolicy() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: PolicyInput }) =>
      (await api.put<Policy>(`/api/policies/admin/${id}`, input)).data,
    onSuccess: () => client.invalidateQueries({ queryKey: ['policies'] }),
  });
}

export function useSetPolicyPublished() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, publish }: { id: number; publish: boolean }) =>
      (await api.put<Policy>(`/api/policies/admin/${id}/${publish ? 'publish' : 'unpublish'}`)).data,
    onSuccess: () => client.invalidateQueries({ queryKey: ['policies'] }),
  });
}
