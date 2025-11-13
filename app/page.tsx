import { booksService } from '@/lib/books/services/books-service';
import { BooksListClient } from '@/lib/books/components/BooksListClient';
import { API_CONFIG } from '@/config/constants';
import { Book } from '@/lib/books/types/book.types';

export default async function Home() {
  let initialBooks: Book[] = [];
  let initialError: string | null = null;

  try {
    const response = await booksService.getBooks(API_CONFIG.DEFAULT_PAGE);
    initialBooks = response.results.slice(0, API_CONFIG.BOOKS_LIMIT);
  } catch (error) {
    initialError = error instanceof Error ? error.message : 'Error al cargar libros';
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              <i className="fa-solid fa-book-open-reader text-primary mr-3"></i>
              Biblioteca de Libros
            </h2>
            <p className="text-muted-foreground">
              <i className="fa-solid fa-compass mr-2"></i>
              Descubre los primeros 10 libros de Project Gutenberg
            </p>
          </div>
        </div>
        <BooksListClient initialBooks={initialBooks} initialError={initialError} />
      </div>
    </div>
  );
}
