export type Role = 'ADMIN' | 'SUPER_ADMIN';
export type Language = 'ENGLISH' | 'FRENCH' | 'SPANISH' | 'TWI';
export type DocumentStatus = 'PENDING' | 'INDEXING' | 'INDEXED' | 'FAILED';
export type MessageRole = 'USER' | 'ASSISTANT';

export interface User {
  id: number;
  email: string;
  fullName: string | null;
  role: Role;
  enabled: boolean;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresInSeconds: number;
  user: User;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ConversationSummary {
  id: string;
  title: string | null;
  language: Language;
  model: string | null;
  provider: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  language: Language | null;
  model: string | null;
  latencyMs: number | null;
  createdAt: string;
}

export interface ConversationDetail {
  conversation: ConversationSummary;
  messages: Message[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  fileName: string;
  contentType: string | null;
  sizeBytes: number;
  category: Category | null;
  chunkCount: number;
  status: DocumentStatus;
  errorMessage: string | null;
  uploadedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeDocumentDetail {
  document: KnowledgeDocument;
  content: string;
}

export interface KnowledgeSearchResult {
  documentId: string;
  title: string;
  category: string | null;
  excerpt: string;
  score: number;
}

export interface Dashboard {
  totals: {
    conversations: number;
    messages: number;
    knowledgeDocuments: number;
    indexedDocuments: number;
    failedDocuments: number;
  };
  model: {
    provider: string;
    model: string;
    baseUrl: string;
    reachable: boolean;
    ragEnabled: boolean;
    embeddingProvider: string;
  };
  recentConversations: ConversationSummary[];
}

export interface Settings {
  provider: string;
  baseUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  ragEnabled: boolean;
  chunkSize: number;
  chunkOverlap: number;
  maxResults: number;
  minScore: number;

  // Environment-only, shown for context but not editable.
  timeoutSeconds: number;
  embeddingProvider: string;
  embeddingModel: string;
  qdrantCollection: string;

  updatedAt: string;
  updatedBy: string | null;
  editable: boolean;
}

export type SettingsUpdate = Pick<
  Settings,
  | 'provider'
  | 'baseUrl'
  | 'model'
  | 'temperature'
  | 'maxTokens'
  | 'systemPrompt'
  | 'ragEnabled'
  | 'chunkSize'
  | 'chunkOverlap'
  | 'maxResults'
  | 'minScore'
>;

export interface Analytics {
  days: number;
  from: string;
  to: string;
  totals: {
    conversations: number;
    messages: number;
    messagesPerConversation: number;
  };
  latency: {
    averageMs: number;
    p50Ms: number;
    p95Ms: number;
    slowestMs: number;
    sampleCount: number;
  };
  activity: { date: string; conversations: number; messages: number }[];
  languages: Slice[];
  documentsByStatus: Slice[];
  documentsByCategory: Slice[];
  models: Slice[];
}

export interface Slice {
  label: string;
  count: number;
}
