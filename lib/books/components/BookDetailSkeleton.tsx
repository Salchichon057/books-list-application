import { Skeleton } from "@/lib/shared/components/ui/Skeleton";

export function BookDetailSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-64 w-48 rounded-lg" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-32 rounded-md" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-md" />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>

          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 max-w-md rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
}
