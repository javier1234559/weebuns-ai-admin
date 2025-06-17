import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AnalyticsResponse } from "@/services/swagger-types";
import statsApi from "@/feature/analysis/services/statsApi";

const STATS_BASE = ["stats"] as const;

export const STATS_KEY_FACTORY = {
  all: STATS_BASE,
  analysis: () => [...STATS_BASE, "analysis"] as const,
} as const;

export const useStatsAnalysis = (
  options?: UseQueryOptions<AnalyticsResponse>,
) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.analysis(),
    queryFn: () => statsApi.getStatsAnalysis(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};
