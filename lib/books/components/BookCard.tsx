import { Book } from "../types/book.types";
import { UI_CONFIG } from "@/config/constants";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const authorName = book.authors[0]?.name || UI_CONFIG.UNKNOWN_AUTHOR;

  return (
    <Link href={`/books/${book.id}`}>
      <article className="group relative h-full rounded-lg border bg-card p-6 transition-all hover:shadow-md">
        <div className="space-y-2">
          <h3 className="font-semibold leading-tight tracking-tight line-clamp-2">
            <i className="fa-solid fa-book text-primary mr-2"></i>
            {book.title}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            <i className="fa-solid fa-user mr-1.5"></i>
            {authorName}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <i className="fa-solid fa-download mr-1.5"></i>
            {book.download_count.toLocaleString()} descargas
          </p>
        </div>
      </article>
    </Link>
  );
}
