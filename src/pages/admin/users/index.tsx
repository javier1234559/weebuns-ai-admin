import type {
  ColumnDef,
  SearchParams,
} from "@/components/feature/data-table/pro-table/types";
import { ProTable } from "@/components/feature/data-table/pro-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaginationState } from "@tanstack/react-table";
import * as React from "react";
import { IUsers } from "@/feature/user/type";
import { useUserList } from "@/feature/user/hooks/useUser";
import UserActions from "@/feature/user/components/UserActions";

const columns: ColumnDef<IUsers>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("username")}</div>
    ),
    search: {
      placeholder: "Search by username",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    search: {
      placeholder: "Search by email",
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
    search: {
      render: ({ value, onChange }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  },
  {
    accessorKey: "profilePicture",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="lowercase">
        <Avatar>
          <AvatarImage src={row.getValue("profilePicture")} />
          <AvatarFallback>
            {row.original.username?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
    search: {
      placeholder: "Search by date",
      render: ({ value, onChange }) => (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      ),
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Email Verified",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isEmailVerified") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];

export default function UsersPage() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchParams, setSearchParams] = React.useState<SearchParams>({});

  const { data, isLoading, refetch } = useUserList({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    ...searchParams,
  });

  const handlePaginationChange = (_pagination: PaginationState) => {
    setPagination(_pagination);
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  return (
    <div>
      <div className="mb-4 text-2xl font-bold">Quản lý người dùng</div>
      <ProTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        onRefresh={refetch}
        onSearch={handleSearch}
        pagination={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          total: data?.pagination?.totalItems || 0,
          onPaginationChange: handlePaginationChange,
        }}
      />
    </div>
  );
}
