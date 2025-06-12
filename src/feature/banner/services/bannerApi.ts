import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  BannerResponse,
  SingleBannerResponse,
  CreateBannerDto,
  UpdateBannerDto,
  DeleteBannerResponse,
} from "@/services/swagger-types";

export interface FindAllBannerQuery {
  page?: number;
  perPage?: number;
  search?: string;
  orderIndex?: number;
}

const bannerApi = {
  getBanners(query: FindAllBannerQuery) {
    return api
      .bannerControllerFindAll(query)
      .then((res: any) => res.data as BannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },

  getBanner(id: string) {
    return api
      .bannerControllerFindOne(id)
      .then((res: any) => res.data as SingleBannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },

  createBanner(data: CreateBannerDto) {
    return api
      .bannerControllerCreate(data)
      .then((res: any) => res.data as SingleBannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },

  updateBanner(id: string, data: UpdateBannerDto) {
    return api
      .bannerControllerUpdate(id, data)
      .then((res: any) => res.data as SingleBannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },

  deleteBanner(id: string) {
    return api
      .bannerControllerRemove(id)
      .then((res: any) => res.data as DeleteBannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },
};

export default bannerApi;
