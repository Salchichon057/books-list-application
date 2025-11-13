import { booksService } from '@/lib/books/services/books-service';
import { Book } from '@/lib/books/types/book.types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

async function getBookById(id: string): Promise<Book | null> {
  const response = await booksService.getBooks();
  const book = response.results.find((b) => b.id === parseInt(id));
  return book || null;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id);

  if (!book) {
    notFound();
  }

  const authorName = book.authors[0]?.name || 'Autor desconocido';
  const birthYear = book.authors[0]?.birth_year;
  const deathYear = book.authors[0]?.death_year;
  const coverImage = book.formats['image/jpeg'] || null;

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <Link href="/">
            <button className="inline-flex items-center text-sm font-medium transition-all hover:translate-x-1">
              ← Volver
            </button>
          </Link>
        </div>
      
        <div className="space-y-4">
          {coverImage && (
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-lg border shadow-lg">
                <Image
                  src={coverImage}
                  alt={book.title}
                  width={192}
                  height={288}
                  className="h-auto w-48 object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}
          <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {book.title}
          </h2>
          <p className="text-muted-foreground mt-2">
            {authorName}
            {(birthYear || deathYear) && (
              <span className="ml-2">
                ({birthYear && `${birthYear}`}
                {birthYear && deathYear && ' - '}
                {deathYear && `${deathYear}`})
              </span>
            )}
            {' • '}
            {book.download_count.toLocaleString()} descargas
          </p>
        </div>

        <div className="space-y-6">
          {book.subjects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Temas</h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span key={index} className="inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-xs font-semibold text-white transition-colors">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {book.bookshelves && book.bookshelves.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                {book.bookshelves.map((shelf, index) => (
                  <span key={index} className="inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-xs font-semibold text-white transition-colors">
                    {shelf}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Idiomas</p>
              <p className="text-sm text-muted-foreground">
                {book.languages.map((lang) => lang.toUpperCase()).join(', ')}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Tipo de medio</p>
              <p className="text-sm text-muted-foreground">{book.media_type}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Copyright</p>
              <p className="text-sm text-muted-foreground">
                {book.copyright ? 'Protegido' : 'Dominio público'}
              </p>
            </div>
          </div>

          {Object.keys(book.formats).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Descargar libro</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(book.formats).slice(0, 6).map(([format, url]) => {
                    const formatName = format.split('/').pop() || format;
                    return (
                      <a
                        key={format}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-black hover:text-white"
                      >
                        {formatName}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
