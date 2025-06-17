import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-[100px]" />
        </CardTitle>
        <Skeleton className="size-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-4 w-[180px] mt-2" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[40px]" />
          </div>

          <Skeleton className="h-3 w-[140px]" />
        </div>
      </CardContent>
    </Card>
  );
}
