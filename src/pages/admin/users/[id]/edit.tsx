import { useParams } from "react-router-dom";
import EditUserForm from "@/feature/user/components/EditUserForm";

export default function UpdateUserPage() {
  const { id } = useParams();
  return <EditUserForm userId={id} />;
}
