import { RouteNames } from "@/constraints/route-name";
import { useUpdateUser, useUserDetail } from "../../hooks/useUser";
import UserForm from "../UserForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateUserFormValues } from "../UserForm/schema";
import EditUserFormSkeleton from "./skeleton";

interface EditUserFormProps {
  userId?: string;
}

export default function EditUserForm({ userId }: EditUserFormProps) {
  const navigate = useNavigate();
  const updateUser = useUpdateUser();

  const { data: userData, isLoading, isError } = useUserDetail(userId ?? null);

  if (isLoading) {
    return <EditUserFormSkeleton />;
  }

  if (isError || !userData?.user) {
    toast.error("Failed to load user data");
    navigate(RouteNames.AdminUsers);
    return null;
  }

  const handleSubmit = async (values: CreateUserFormValues) => {
    try {
      await updateUser.mutateAsync({
        id: userId ?? "",
        data: values,
      });
      toast.success("User updated successfully");
      navigate(RouteNames.AdminUsers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  const formDefaultValues = {
    username: userData.user.username,
    email: userData.user.email,
    firstName: userData.user.firstName ?? "",
    lastName: userData.user.lastName ?? "",
    profilePicture: userData.user.profilePicture ?? "",
    bio: userData.user.bio ?? "",
    role: userData.user.role,
  };

  return (
    <UserForm
      isEdit
      onSubmit={handleSubmit}
      isLoading={updateUser.isPending}
      defaultValues={formDefaultValues}
    />
  );
}
