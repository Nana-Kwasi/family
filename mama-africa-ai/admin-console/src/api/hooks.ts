import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import type {
  Analytics,
  Category,
  ConversationDetail,
  ConversationSummary,
  Dashboard,
  KnowledgeDocument,
  KnowledgeDocumentDetail,
  KnowledgeSearchResult,
  Page,
  Role,
  Settings,
  SettingsUpdate,
  User,
} from './types';

export const keys = {
  dashboard: ['dashboard'] as const,
  settings: ['settings'] as const,
  analytics: (days: number) => ['analytics', days] as const,
  users: ['users'] as const,
  categories: ['categories'] as const,
  conversations: (params: unknown) => ['conversations', params] as const,
  conversation: (id: string) => ['conversation', id] as const,
  documents: (params: unknown) => ['documents', params] as const,
  document: (id: string) => ['document', id] as const,
  knowledgeSearch: (query: string, category: string) => ['knowledge-search', query, category] as const,
};

// --- Dashboard & settings ---------------------------------------------------

export function useDashboard() {
  return useQuery({
    queryKey: keys.dashboard,
    queryFn: async () => (await api.get<Dashboard>('/api/dashboard')).data,
    // The model-reachability probe is worth refreshing while the page is open.
    refetchInterval: 30_000,
  });
}

export function useSettings() {
  return useQuery({
    queryKey: keys.settings,
    queryFn: async () => (await api.get<Settings>('/api/settings')).data,
  });
}

export function useUpdateSettings() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (update: SettingsUpdate) =>
      (await api.put<Settings>('/api/settings', update)).data,
    onSuccess: () => invalidateSettings(client),
  });
}

export function useResetSettings() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async () => (await api.post<Settings>('/api/settings/reset')).data,
    onSuccess: () => invalidateSettings(client),
  });
}

/** Settings drive the model and retrieval, so the dashboard's model panel is stale afterwards. */
function invalidateSettings(client: ReturnType<typeof useQueryClient>) {
  client.invalidateQueries({ queryKey: keys.settings });
  client.invalidateQueries({ queryKey: keys.dashboard });
}

export function useAnalytics(days: number) {
  return useQuery({
    queryKey: keys.analytics(days),
    queryFn: async () => (await api.get<Analytics>('/api/analytics', { params: { days } })).data,
  });
}

// --- Conversations ----------------------------------------------------------

interface ConversationParams {
  page: number;
  size: number;
  query: string;
}

export function useConversations(params: ConversationParams) {
  return useQuery({
    queryKey: keys.conversations(params),
    queryFn: async () =>
      (
        await api.get<Page<ConversationSummary>>('/api/conversations', {
          params: {
            page: params.page,
            size: params.size,
            ...(params.query ? { query: params.query } : {}),
          },
        })
      ).data,
  });
}

export function useConversation(id: string | null) {
  return useQuery({
    queryKey: keys.conversation(id ?? ''),
    queryFn: async () => (await api.get<ConversationDetail>(`/api/conversations/${id}`)).data,
    enabled: Boolean(id),
  });
}

export function useDeleteConversation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => api.delete(`/api/conversations/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['conversations'] });
      client.invalidateQueries({ queryKey: keys.dashboard });
    },
  });
}

// --- Knowledge base ---------------------------------------------------------

interface DocumentParams {
  page: number;
  size: number;
  query: string;
  categoryId: number | null;
}

export function useDocuments(params: DocumentParams) {
  return useQuery({
    queryKey: keys.documents(params),
    queryFn: async () =>
      (
        await api.get<Page<KnowledgeDocument>>('/api/knowledge', {
          params: {
            page: params.page,
            size: params.size,
            ...(params.query ? { query: params.query } : {}),
            ...(params.categoryId ? { categoryId: params.categoryId } : {}),
          },
        })
      ).data,
    // Indexing happens on the server, so poll while anything is still in flight.
    refetchInterval: (query) =>
      query.state.data?.content.some((d) => d.status === 'PENDING' || d.status === 'INDEXING')
        ? 2_000
        : false,
    // Without this the poll pauses whenever the tab loses focus, and an admin who switches
    // away during a long indexing run comes back to a stale "INDEXING" row.
    refetchIntervalInBackground: true,
    // The global 30s staleTime would otherwise serve a cached page to the poll.
    staleTime: 0,
  });
}

export function useDocument(id: string | null) {
  return useQuery({
    queryKey: keys.document(id ?? ''),
    queryFn: async () => (await api.get<KnowledgeDocumentDetail>(`/api/knowledge/${id}`)).data,
    enabled: Boolean(id),
  });
}

export function useUploadDocument() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: { file: File; title: string; categorySlug: string }) => {
      const form = new FormData();
      form.append('file', input.file);
      const params: Record<string, string> = {};
      if (input.title) params.title = input.title;
      if (input.categorySlug) params.categorySlug = input.categorySlug;

      return (
        await api.post<KnowledgeDocument>('/api/knowledge', form, {
          params,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data;
    },
    onSuccess: () => invalidateKnowledge(client),
  });
}

export function useUpdateDocument() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: string; title: string; categorySlug: string }) =>
      api.put(`/api/knowledge/${input.id}`, {
        title: input.title,
        categorySlug: input.categorySlug || null,
      }),
    onSuccess: () => invalidateKnowledge(client),
  });
}

export function useDeleteDocument() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => api.delete(`/api/knowledge/${id}`),
    onSuccess: () => invalidateKnowledge(client),
  });
}

export function useReindexDocument() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => api.post(`/api/knowledge/${id}/reindex`),
    onSuccess: () => invalidateKnowledge(client),
  });
}

export function useReindexAll() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async () => (await api.post<{ queued: number }>('/api/knowledge/reindex')).data,
    onSuccess: () => invalidateKnowledge(client),
  });
}

export function useKnowledgeSearch(query: string, categorySlug: string, enabled: boolean) {
  return useQuery({
    queryKey: keys.knowledgeSearch(query, categorySlug),
    queryFn: async () =>
      (
        await api.get<KnowledgeSearchResult[]>('/api/knowledge/search', {
          params: { query, ...(categorySlug ? { categorySlug } : {}) },
        })
      ).data,
    enabled: enabled && query.trim().length > 0,
  });
}

function invalidateKnowledge(client: ReturnType<typeof useQueryClient>) {
  client.invalidateQueries({ queryKey: ['documents'] });
  client.invalidateQueries({ queryKey: keys.dashboard });
}

// --- Categories -------------------------------------------------------------

export function useCategories() {
  return useQuery({
    queryKey: keys.categories,
    queryFn: async () => (await api.get<Category[]>('/api/categories')).data,
  });
}

export function useSaveCategory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id?: number; name: string; description: string }) => {
      const body = { name: input.name, description: input.description || null };
      return input.id
        ? (await api.put<Category>(`/api/categories/${input.id}`, body)).data
        : (await api.post<Category>('/api/categories', body)).data;
    },
    onSuccess: () => client.invalidateQueries({ queryKey: keys.categories }),
  });
}

export function useDeleteCategory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => api.delete(`/api/categories/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: keys.categories });
      client.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

// --- Users ------------------------------------------------------------------

export function useUsers(enabled: boolean) {
  return useQuery({
    queryKey: keys.users,
    queryFn: async () => (await api.get<User[]>('/api/users')).data,
    enabled,
  });
}

export function useCreateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: { email: string; fullName: string; password: string; role: Role }) =>
      (await api.post<User>('/api/users', input)).data,
    onSuccess: () => client.invalidateQueries({ queryKey: keys.users }),
  });
}

export function useUpdateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: number; fullName: string; role: Role; enabled: boolean }) =>
      (
        await api.put<User>(`/api/users/${input.id}`, {
          fullName: input.fullName,
          role: input.role,
          enabled: input.enabled,
        })
      ).data,
    onSuccess: () => client.invalidateQueries({ queryKey: keys.users }),
  });
}

export function useDeleteUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => api.delete(`/api/users/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.users }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (input: { currentPassword: string; newPassword: string }) =>
      api.put('/api/auth/password', input),
  });
}
