import { Skeleton } from "@/components/ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="mt-10 grid gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border rounded-xl p-4 bg-white shadow-sm space-y-2"
        >
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
