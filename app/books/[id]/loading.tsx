import { BookDetailSkeleton } from "@/lib/books/components/BookDetailSkeleton";

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <BookDetailSkeleton />
      </div>
    </div>
  );
}
