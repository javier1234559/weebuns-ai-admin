import { useState } from "react";
import BannerFilterBar from "@/feature/banner/components/BannerFilterBar";
import BannerList from "@/feature/banner/components/BannerList";
import BannerDialog from "@/feature/banner/components/BannerDialog";
import {
  useBanners,
  useCreateBanner,
  useUpdateBanner,
  useDeleteBanner,
} from "@/feature/banner/hooks/useBanner";
import { Banner, CreateBannerDto } from "@/services/swagger-types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function BannerManagerView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<any>(null);

  const { data } = useBanners();
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const deleteBanner = useDeleteBanner();

  const handleCreateBanner = (values: CreateBannerDto) => {
    if (editBanner && editBanner.id) {
      // Edit mode
      updateBanner.mutate(
        { id: editBanner.id, data: values },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật banner");
            setDialogOpen(false);
            setEditBanner(null);
          },
          onError: (error: any) => {
            toast.error("Có lỗi xảy ra khi cập nhật banner");
            console.log(error);
          },
        },
      );
    } else {
      // Create mode
      createBanner.mutate(values, {
        onSuccess: () => {
          toast.success("Đã tạo banner mới");
          setDialogOpen(false);
          setEditBanner(null);
        },
        onError: (error: any) => {
          toast.error("Có lỗi xảy ra khi tạo banner");
          console.log(error);
        },
      });
    }
  };

  const handleDeleteBanner = (id: string) => {
    deleteBanner.mutate(id, {
      onSuccess: () => {
        toast.success("Đã xóa banner");
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra khi xóa banner");
        console.log(error);
      },
    });
  };

  const handleEditBanner = (banner: Banner) => {
    // Chỉ lấy các trường cần thiết cho form
    const formValues = {
      title: banner.title,
      actionLink: banner.actionLink,
      imageUrl: banner.imageUrl,
      orderIndex: Number(banner.orderIndex),
    };
    setEditBanner({ ...formValues, id: banner.id }); // Giữ lại id để biết là đang edit
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mb-4">
        <BannerFilterBar
          search={search}
          onSearch={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            setEditBanner(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm banner mới
        </Button>
      </div>
      <BannerList
        banners={data?.data || []}
        onEdit={handleEditBanner}
        onDelete={handleDeleteBanner}
        loading={deleteBanner.isPending}
      />
      <BannerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateBanner}
        loading={createBanner.isPending}
        initialValues={editBanner}
      />
    </>
  );
}
