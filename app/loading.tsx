import { BooksListSkeleton } from "@/lib/books/components/BooksListSkeleton";

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <BooksListSkeleton />
      </div>
    </div>
  );
}
