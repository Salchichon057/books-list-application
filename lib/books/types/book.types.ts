export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  summaries?: string[];
  editors?: Author[];
  translators?: Author[];
  subjects: string[];
  bookshelves?: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface BooksApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
