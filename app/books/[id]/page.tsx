import { booksService } from "@/lib/books/services/books-service";
import { Book } from "@/lib/books/types/book.types";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DownloadSelector } from "@/lib/books/components/DownloadSelector";

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

  const authorName = book.authors[0]?.name || "Autor desconocido";
  const birthYear = book.authors[0]?.birth_year;
  const deathYear = book.authors[0]?.death_year;
  const coverImage = book.formats["image/jpeg"] || null;

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <Link href="/">
            <button className="inline-flex items-center text-sm font-medium transition-all hover:translate-x-1">
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Volver
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
              <i className="fa-solid fa-book text-primary mr-3"></i>
              {book.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              <i className="fa-solid fa-user mr-1.5"></i>
              {authorName}
              {(birthYear || deathYear) && (
                <span className="ml-2">
                  ({birthYear && `${birthYear}`}
                  {birthYear && deathYear && " - "}
                  {deathYear && `${deathYear}`})
                </span>
              )}
            </p>
          </div>
          <p>
            <i className="fa-solid fa-download mr-1.5"></i>
            {book.download_count.toLocaleString()} descargas
          </p>
        </div>

        <div className="space-y-6">
          {book.subjects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                <i className="fa-solid fa-tags mr-2"></i>
                Temas
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-xs font-semibold text-white transition-colors"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {book.bookshelves && book.bookshelves.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                <i className="fa-solid fa-folder mr-2"></i>
                Categorías
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.bookshelves.map((shelf, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-xs font-semibold text-white transition-colors"
                  >
                    {shelf}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                <i className="fa-solid fa-language mr-1.5"></i>
                Idiomas
              </p>
              <p className="text-sm text-muted-foreground">
                {book.languages.map((lang) => lang.toUpperCase()).join(", ")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                <i className="fa-solid fa-file mr-1.5"></i>
                Tipo de medio
              </p>
              <p className="text-sm text-muted-foreground">{book.media_type}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                <i className="fa-solid fa-shield-halved mr-1.5"></i>
                Copyright
              </p>
              <p className="text-sm text-muted-foreground">
                {book.copyright ? "Protegido" : "Dominio público"}
              </p>
            </div>
          </div>

            {Object.keys(book.formats).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
              <i className="fa-solid fa-cloud-arrow-down mr-2"></i>
              Descargar libro
              </h3>
              <DownloadSelector formats={book.formats} />
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
