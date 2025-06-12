import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  BannerResponse,
  SingleBannerResponse,
  CreateBannerDto,
  UpdateBannerDto,
} from "@/services/swagger-types";
import bannerApi, {
  FindAllBannerQuery,
} from "@/feature/banner/services/bannerApi";

const BANNER_BASE = ["banner"] as const;

export const BANNER_KEY_FACTORY = {
  all: BANNER_BASE,
  list: (params?: FindAllBannerQuery) =>
    [...BANNER_BASE, "list", params] as const,
  detail: (id: string) => [...BANNER_BASE, "detail", id] as const,
};

export const useBanners = (
  query?: FindAllBannerQuery,
  options?: UseQueryOptions<BannerResponse>,
) => {
  return useQuery({
    queryKey: BANNER_KEY_FACTORY.list(query),
    queryFn: () => bannerApi.getBanners(query || {}),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useBanner = (
  id: string,
  options?: UseQueryOptions<SingleBannerResponse>,
) => {
  return useQuery({
    queryKey: BANNER_KEY_FACTORY.detail(id),
    queryFn: () => bannerApi.getBanner(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBannerDto) => bannerApi.createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEY_FACTORY.all });
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBannerDto }) =>
      bannerApi.updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEY_FACTORY.all });
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bannerApi.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEY_FACTORY.all });
    },
  });
};
