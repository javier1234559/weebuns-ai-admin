import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/feature/user/components/ProfileForm";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { ProfileFormValues } from "@/feature/user/components/ProfileForm/schema";
import { useUpdateTeacherProfile } from "@/feature/user/hooks/useUser";

export default function PageProfile() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: updateTeacherProfile } = useUpdateTeacherProfile();

  const handleSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    setIsLoading(true);
    updateTeacherProfile({
      id: user.id,
      data: {
        username: user.username,
        email: user.email,
        firstName: values.firstName ?? "",
        lastName: values.lastName ?? "",
        bio: values.bio ?? "",
        profilePicture: values.profilePicture ?? "",
        longBio: values.longBio ?? "",
        introVideoUrlEmbed: values.introVideoUrlEmbed ?? "",
        certifications: values.certifications ?? "",
        teachingExperience: values.teachingExperience ?? "",
        other: values.other ?? "",
      },
    }, {
      onSuccess: (updatedUser) => {
        const data = updatedUser.user;
        setUser({
          ...user,
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          bio: data.bio ?? "",
          profilePicture: data.profilePicture ?? "",
          teacherProfile: {
            id: data.teacherProfile!.id,
            userId: data.teacherProfile!.userId,
            createdAt: data.teacherProfile!.createdAt,
            updatedAt: data.teacherProfile!.updatedAt,
            deletedAt: data.teacherProfile!.deletedAt,
            longBio: data.teacherProfile!.longBio ?? "",
            introVideoUrlEmbed: data.teacherProfile!.introVideoUrlEmbed ?? "",
            certifications: data.teacherProfile!.certifications ?? "",
            teachingExperience: data.teacherProfile!.teachingExperience ?? "",
            other: data.teacherProfile!.other ?? "",
          },
        });
        toast.success("Cập nhật thông tin thành công");
      },
      onSettled: () => setIsLoading(false),
      onError: () => {
        toast.error("Cập nhật thông tin thất bại");
      },
    });
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Tài khoản của bạn</p>
      </div>
      <Separator />
      <ProfileForm onSubmit={handleSubmit} isLoading={isLoading} user={user} />
    </div>
  );
}
