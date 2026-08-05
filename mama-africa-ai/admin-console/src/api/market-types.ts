export const BORN_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export type BornDay = (typeof BORN_DAYS)[number];

export type PromotionPlacement =
  | 'ANNOUNCEMENT_STRIP'
  | 'STORE_HERO'
  | 'PRODUCT_BADGE'
  | 'WELCOME_POPUP';

export type PromotionTarget = 'PRODUCT' | 'BORN_DAY' | 'PRODUCT_TYPE' | 'COLLECTION' | 'BUNDLE';

export interface SizeChartRow {
  size: string;
  usChest: string | null;
  euChest: string | null;
  usLength: string | null;
  euLength: string | null;
}

/** Row shape in the product table — no child collections. */
export interface ProductSummary {
  id: number;
  legacyId: number | null;
  slug: string;
  name: string;
  bornDay: string | null;
  collection: string | null;
  type: string;
  label: string;
  priceCents: number;
  image: string | null;
  soldOut: boolean;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  updatedAt: string;
}

export interface Product extends ProductSummary {
  tagline: string | null;
  cardBlurb: string | null;
  description: string | null;
  price: string;
  currency: string;
  images: string[];
  sizes: string[];
  details: string[];
  perfectFor: string[];
  sizeChart: SizeChartRow[];
  amazonUrl: string | null;
  etsyUrl: string | null;
  printifyUrl: string | null;
  updatedBy: string | null;
}

/** Payload for create and update. Mirrors the backend's ProductRequest. */
export interface ProductInput {
  name: string;
  slug?: string | null;
  bornDay?: string | null;
  collection?: string | null;
  type: string;
  label: string;
  tagline?: string | null;
  cardBlurb?: string | null;
  description?: string | null;
  priceCents: number;
  currency?: string | null;
  image?: string | null;
  images: string[];
  sizes: string[];
  details: string[];
  perfectFor: string[];
  sizeChart: SizeChartRow[];
  amazonUrl?: string | null;
  etsyUrl?: string | null;
  printifyUrl?: string | null;
  soldOut: boolean;
  active: boolean;
  featured: boolean;
  sortOrder?: number | null;
}

export interface Bundle {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  active: boolean;
  sortOrder: number;
  items: ProductSummary[];
}

export interface BundleInput {
  title: string;
  slug?: string | null;
  subtitle?: string | null;
  description?: string | null;
  active: boolean;
  sortOrder?: number | null;
  productIds: number[];
}

export interface Promotion {
  id: number;
  slug: string;
  headline: string;
  body: string | null;
  badgeLabel: string | null;
  placement: PromotionPlacement;
  ctaLabel: string | null;
  ctaUrl: string | null;
  targetType: PromotionTarget | null;
  targetValue: string | null;
  discountPct: number | null;
  startsAt: string | null;
  endsAt: string | null;
  active: boolean;
  /** Active *and* inside its date window — what the website actually shows. */
  live: boolean;
  sortOrder: number;
  updatedAt: string;
  updatedBy: string | null;
}

export interface PromotionInput {
  headline: string;
  slug?: string | null;
  body?: string | null;
  badgeLabel?: string | null;
  placement: PromotionPlacement;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  targetType?: PromotionTarget | null;
  targetValue?: string | null;
  discountPct?: number | null;
  startsAt?: string | null;
  endsAt?: string | null;
  active: boolean;
  sortOrder?: number | null;
}

export interface ImageLibrary {
  available: boolean;
  images: string[];
}
