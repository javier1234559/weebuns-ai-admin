import { useEffect } from "react";
import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

interface UseCheckGradingProps {
  gradedById?: string;
  isLoading: boolean;
}

export const useCheckGrading = ({
  gradedById,
  isLoading,
}: UseCheckGradingProps) => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;
    if (!gradedById) return;

    if (user?.id !== gradedById) {
      toast.error(
        "Bạn không có quyền xem bài viết này vì không phải người đã nhận chấm.",
      );
      window.location.href = RouteNames.TeacherWritingGrading;
    }
  }, [gradedById, isLoading, user?.id]);
};
