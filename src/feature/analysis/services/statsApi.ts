import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import { AnalyticsResponse } from "@/services/swagger-types";

const statsApi = {
  // Wallet
  getStatsAnalysis() {
    return api
      .statsControllerGetAnalytics()
      .then((res: any) => res.data as AnalyticsResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default statsApi;
