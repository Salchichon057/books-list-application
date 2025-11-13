'use client';

import { useState, useEffect, useCallback } from 'react';
import { Book, FetchStatus } from '../types/book.types';
import { booksService } from '../services/books-service';
import { API_CONFIG } from '@/config/constants';

interface UseBooksReturn {
  books: Book[];
  status: FetchStatus;
  error: Error | null;
  refetch: () => void;
}

interface UseBooksProps {
  initialBooks?: Book[];
  initialError?: string | null;
  page?: number;
}

export function useBooks({ 
  initialBooks = [], 
  initialError = null,
  page = API_CONFIG.DEFAULT_PAGE 
}: UseBooksProps = {}): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [status, setStatus] = useState<FetchStatus>(initialError ? 'error' : initialBooks.length > 0 ? 'success' : 'idle');
  const [error, setError] = useState<Error | null>(initialError ? new Error(initialError) : null);

  const fetchBooks = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await booksService.getBooks(page);
      const limitedBooks = response.results.slice(0, API_CONFIG.BOOKS_LIMIT);
      setBooks(limitedBooks);
      setStatus('success');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      setStatus('error');
    }
  }, [page]);

  useEffect(() => {
    if (initialBooks.length === 0 && !initialError) {
      fetchBooks();
    }
  }, [initialBooks.length, initialError, fetchBooks]);

  return {
    books,
    status,
    error,
    refetch: fetchBooks,
  };
}
