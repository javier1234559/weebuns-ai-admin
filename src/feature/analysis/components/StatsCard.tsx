import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/date";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  valueChange: string;
  lastUpdate: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  valueChange,
  lastUpdate,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="size-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            <p className="text-sm font-medium text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary">
              {valueChange}
            </span>
            <span className="text-xs text-muted-foreground">hôm nay</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Cập nhật {getRelativeTime(lastUpdate)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
