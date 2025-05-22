import { RouteNames } from "@/constraints/route-name";
import { useCreateUser } from "../../hooks/useUser";
import UserForm from "../UserForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateUserFormValues, defaultValues } from "../UserForm/schema";

export default function CreateUserForm() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = async (values: CreateUserFormValues) => {
    try {
      await createUser.mutateAsync({
        ...values,
        password: values.password ?? "",
      });
      toast.success("User created successfully");
      navigate(RouteNames.AdminUsers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    }
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      isLoading={createUser.isPending}
      defaultValues={defaultValues}
    />
  );
}
