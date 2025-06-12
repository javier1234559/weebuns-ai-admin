import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  actionLink: z.string().min(1, "Vui lòng nhập đường dẫn"),
  imageUrl: z.string().min(1, "Vui lòng nhập URL hình ảnh"),
  orderIndex: z.number().min(1, "Vị trí phải lớn hơn 0"),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;

export const defaultValues: BannerFormValues = {
  title: "",
  actionLink: "",
  imageUrl: "",
  orderIndex: 1,
};
