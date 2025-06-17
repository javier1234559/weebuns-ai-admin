export type StatType = "circulating" | "total_supply" | "commission" | "user";

export interface StatItem {
  type: StatType;
  value: number;
  description: string;
  changedValue: string;
  updateTime: string;
}

export interface AnalyticsData {
  circulatingStats: StatItem;
  totalSupplyStats: StatItem;
  commissionStats: StatItem;
  userStats: StatItem;
}

// Example response structure
export const exampleAnalyticsData: AnalyticsData = {
  circulatingStats: {
    type: "circulating",
    value: 1914,
    description: "1.914.000 VND",
    changedValue: "0 token",
    updateTime: "2025-06-17T16:15:10.728Z",
  },
  totalSupplyStats: {
    type: "total_supply",
    value: 2225,
    description: "2.225.000 VND",
    changedValue: "+0 token",
    updateTime: "2025-06-17T16:15:10.728Z",
  },
  commissionStats: {
    type: "commission",
    value: 311,
    description: "311.000 VND",
    changedValue: "0 token",
    updateTime: "2025-06-15T16:32:43.219Z",
  },
  userStats: {
    type: "user",
    value: 12,
    description: "",
    changedValue: "0 user",
    updateTime: "2025-06-17T17:03:26.327Z",
  },
};
