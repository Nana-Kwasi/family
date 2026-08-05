export type StoryKind = 'STORY' | 'PROVERB';

export type ContentType = 'GENERAL' | 'CULTURAL_STORYBOOK' | 'DIASPORA_LEARNING_EDITION';

export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type ReviewSubject = 'STORY' | 'BOOK' | 'DIASPORA';

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  GENERAL: 'General',
  CULTURAL_STORYBOOK: 'Cultural Storybook',
  DIASPORA_LEARNING_EDITION: 'Diaspora Learning Edition',
};

export const SUBJECT_LABELS: Record<ReviewSubject, string> = {
  STORY: 'Story',
  BOOK: 'E-book',
  DIASPORA: 'Diaspora story',
};

export interface Chapter {
  heading: string | null;
  content: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface StorySummary {
  id: number;
  slug: string;
  kind: StoryKind;
  title: string | null;
  contentType: ContentType;
  published: boolean;
  author: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Story extends StorySummary {
  content: string;
  sortOrder: number;
  chapters: Chapter[];
  socialLinks: SocialLink[];
  updatedBy: string | null;
}

export interface StoryInput {
  kind: StoryKind;
  title?: string | null;
  content: string;
  contentType: ContentType;
  published: boolean;
  author?: string | null;
  sortOrder?: number | null;
  chapters: Chapter[];
  socialLinks: SocialLink[];
}

export interface DiasporaStory {
  id: number;
  name: string;
  country: string | null;
  akanName: string | null;
  story: string;
  status: ModerationStatus;
  createdAt: string;
}

export interface Review {
  id: number;
  subject: ReviewSubject;
  subjectId: number | null;
  subjectTitle: string | null;
  name: string;
  rating: number;
  comment: string | null;
  status: ModerationStatus;
  createdAt: string;
}

export interface Subscriber {
  id: number;
  email: string;
  akanName: string | null;
  dayBorn: string | null;
  dob: string | null;
  source: string | null;
  createdAt: string;
}

export interface CultureOverview {
  stories: number;
  proverbs: number;
  published: number;
  diasporaTotal: number;
  diasporaPending: number;
  reviewsTotal: number;
  reviewsPending: number;
}

export type SupportStatus = 'NEW' | 'HANDLED' | 'SPAM';

export interface SupportMessage {
  id: number;
  name: string | null;
  email: string;
  message: string;
  status: SupportStatus;
  emailed: boolean;
  createdAt: string;
  handledAt: string | null;
  handledBy: string | null;
}

export interface CustomerAccount {
  id: number;
  email: string;
  fullName: string;
  preferredName: string;
  akanName: string | null;
  dayBorn: string | null;
  dob: string | null;
  createdAt: string;
}

export type PolicyKind =
  | 'TERMS' | 'PRIVACY' | 'COOKIES' | 'AI_ASSISTANT'
  | 'DATA_PROCESSING' | 'CONTENT_SUBMISSION' | 'SHIPPING_RETURNS' | 'MARKETING';

export interface Policy {
  id: number;
  kind: PolicyKind;
  title: string;
  summary: string | null;
  body: string;
  version: number;
  requiredAtSignup: boolean;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
  updatedBy: string | null;
  publishedAt: string | null;
}

export interface PolicyInput {
  title: string;
  summary?: string | null;
  body: string;
  requiredAtSignup: boolean;
  sortOrder?: number | null;
}
