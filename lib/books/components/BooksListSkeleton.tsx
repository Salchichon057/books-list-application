import { Skeleton } from "@/lib/shared/components/ui/Skeleton";

export function BooksListSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Skeleton className="h-9 w-80 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
            <div className="mt-4 pt-4 border-t">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
