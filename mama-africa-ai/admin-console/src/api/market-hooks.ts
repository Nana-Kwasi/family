import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { api } from './client';
import type { Page } from './types';
import type {
  Bundle,
  BundleInput,
  ImageLibrary,
  Product,
  ProductInput,
  ProductSummary,
  Promotion,
  PromotionInput,
} from './market-types';

export interface ProductParams {
  search?: string;
  bornDay?: string;
  type?: string;
  active?: boolean;
  page: number;
  size: number;
}

export const marketKeys = {
  products: (params: unknown) => ['market-products', params] as const,
  product: (id: number) => ['market-product', id] as const,
  bundles: ['market-bundles'] as const,
  promotions: ['market-promotions'] as const,
  images: (search: string) => ['market-images', search] as const,
};

/** Drops every cached product list — any write can reorder or re-filter the table. */
function invalidateProducts(client: QueryClient) {
  return client.invalidateQueries({ queryKey: ['market-products'] });
}

// --- Products ---------------------------------------------------------------

export function useProducts(params: ProductParams) {
  return useQuery({
    queryKey: marketKeys.products(params),
    queryFn: async () => {
      // Blank filters are omitted rather than sent empty, so the backend sees a real absence.
      const query: Record<string, string | number | boolean> = {
        page: params.page,
        size: params.size,
      };
      if (params.search?.trim()) query.search = params.search.trim();
      if (params.bornDay) query.bornDay = params.bornDay;
      if (params.type) query.type = params.type;
      if (params.active !== undefined) query.active = params.active;

      return (await api.get<Page<ProductSummary>>('/api/market/products', { params: query })).data;
    },
    placeholderData: (previous) => previous,
  });
}

export function useProduct(id: number | null) {
  return useQuery({
    queryKey: marketKeys.product(id ?? 0),
    queryFn: async () => (await api.get<Product>(`/api/market/products/${id}`)).data,
    enabled: id !== null,
  });
}

export function useSaveProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number | null; input: ProductInput }) =>
      id === null
        ? (await api.post<Product>('/api/market/products', input)).data
        : (await api.put<Product>(`/api/market/products/${id}`, input)).data,
    onSuccess: (product) => {
      void invalidateProducts(client);
      void client.invalidateQueries({ queryKey: marketKeys.product(product.id) });
    },
  });
}

export function useSetProductActive() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, active }: { id: number; active: boolean }) =>
      (await api.put<Product>(`/api/market/products/${id}/active`, null, { params: { active } })).data,
    onSuccess: () => invalidateProducts(client),
  });
}

export function useDeleteProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/market/products/${id}`);
    },
    onSuccess: () => invalidateProducts(client),
  });
}

// --- Bundles ----------------------------------------------------------------

export function useBundles() {
  return useQuery({
    queryKey: marketKeys.bundles,
    queryFn: async () => (await api.get<Bundle[]>('/api/market/bundles')).data,
  });
}

export function useSaveBundle() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number | null; input: BundleInput }) =>
      id === null
        ? (await api.post<Bundle>('/api/market/bundles', input)).data
        : (await api.put<Bundle>(`/api/market/bundles/${id}`, input)).data,
    onSuccess: () => client.invalidateQueries({ queryKey: marketKeys.bundles }),
  });
}

export function useDeleteBundle() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/market/bundles/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: marketKeys.bundles }),
  });
}

// --- Promotions -------------------------------------------------------------

export function usePromotions() {
  return useQuery({
    queryKey: marketKeys.promotions,
    queryFn: async () => (await api.get<Promotion[]>('/api/market/promotions')).data,
  });
}

export function useSavePromotion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number | null; input: PromotionInput }) =>
      id === null
        ? (await api.post<Promotion>('/api/market/promotions', input)).data
        : (await api.put<Promotion>(`/api/market/promotions/${id}`, input)).data,
    onSuccess: () => client.invalidateQueries({ queryKey: marketKeys.promotions }),
  });
}

export function useSetPromotionActive() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, active }: { id: number; active: boolean }) =>
      (await api.put<Promotion>(`/api/market/promotions/${id}/active`, null, { params: { active } })).data,
    onSuccess: () => client.invalidateQueries({ queryKey: marketKeys.promotions }),
  });
}

export function useDeletePromotion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/market/promotions/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: marketKeys.promotions }),
  });
}

// --- Image picker -----------------------------------------------------------

export function useImageLibrary(search: string, enabled: boolean) {
  return useQuery({
    queryKey: marketKeys.images(search),
    queryFn: async () =>
      (await api.get<ImageLibrary>('/api/market/images', { params: search ? { search } : {} })).data,
    enabled,
    // The folder is a deployed asset directory; it does not change while the console is open.
    staleTime: 5 * 60_000,
  });
}
