import { Skeleton } from "@/components/ui/skeleton";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

export function AnalysisViewSkeleton() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 lg:px-0">
        <div className="mb-8">
          <Skeleton className="h-7 w-[200px] mb-2" />
          <Skeleton className="h-5 w-[300px]" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 lg:p-0">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
      </div>
    </div>
  );
}
