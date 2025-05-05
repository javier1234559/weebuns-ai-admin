import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRemoveUser } from "@/feature/user/hooks/useUser";
import { IUsers } from "@/feature/user/type";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserActions = ({ user }: { user: IUsers }) => {
  const removeUser = useRemoveUser();
  const navigate = useNavigate();
  const handleRemove = async () => {
    try {
      await removeUser.mutateAsync(user.id);
      toast.success("User removed successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove user");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.id);
    toast.success("User ID copied to clipboard");
  };

  const handleViewDetails = () => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleEdit = () => {
    navigate(`/admin/users/${user.id}/edit`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopy}>Copy user ID</DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewDetails}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>Edit user</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={handleRemove}>
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
