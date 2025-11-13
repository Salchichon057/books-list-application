'use client';

import { Book } from '../types/book.types';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from './BookCard';
import { BookLoading } from './BookLoading';
import { BookError } from './BookError';

interface BooksListClientProps {
  initialBooks: Book[];
  initialError: string | null;
}

export function BooksListClient({ initialBooks, initialError }: BooksListClientProps) {
  const { books, status, error, refetch } = useBooks({ initialBooks, initialError });

  if (status === 'loading') {
    return <BookLoading />;
  }

  if (status === 'error' && error) {
    return <BookError error={error} onRetry={refetch} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
