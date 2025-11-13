export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="h-5 w-20 animate-pulse rounded bg-muted"></div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-64 w-48 animate-pulse rounded-lg bg-muted"></div>
          </div>

          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-32 animate-pulse rounded-md bg-muted"></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-24 animate-pulse rounded-md bg-muted"></div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded bg-muted"></div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="h-6 w-40 animate-pulse rounded bg-muted"></div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 animate-pulse rounded-md bg-muted"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
