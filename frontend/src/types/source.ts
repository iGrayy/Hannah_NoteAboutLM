import { BaseEntity } from './common';

export type SourceType = 'text' | 'file' | 'image' | 'url' | 'pdf';

export interface Source extends BaseEntity {
  title: string;
  content: string;
  type: SourceType;
  size?: number;
  url?: string;
  metadata?: SourceMetadata;
}

export interface SourceMetadata {
  fileType?: string;
  encoding?: string;
  language?: string;
  wordCount?: number;
  tags?: string[];
  category?: string;
}

export interface CreateSourceRequest {
  title: string;
  content: string;
  type: SourceType;
  url?: string;
  metadata?: Partial<SourceMetadata>;
}

export interface UpdateSourceRequest {
  title?: string;
  content?: string;
  metadata?: Partial<SourceMetadata>;
}

export interface SourceSearchParams {
  query?: string;
  type?: SourceType;
  category?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}
