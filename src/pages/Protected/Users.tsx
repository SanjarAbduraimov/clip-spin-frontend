import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../../components/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu/DropdownMenu";
import DataTable from "../../components/Table/DataTable";
import { useUsers, useUpdateUserRole } from "../../hooks/api/useUsers";
import { User } from "../../types";

const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useUsers(page, limit);
  const { mutateAsync } = useUpdateUserRole();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "full_name",
      header: "Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original as User & { role?: string };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await mutateAsync({ id: user._id, role: "admin" });
                  queryClient.invalidateQueries({ queryKey: ["users"] });
                }}
                disabled={user.role === "admin"}
              >
                Set as Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await mutateAsync({ id: user._id, role: "editor" });
                  queryClient.invalidateQueries({ queryKey: ["users"] });
                }}
                disabled={user.role === "editor"}
              >
                Set as Editor
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  await mutateAsync({ id: user._id, role: "user" });
                  queryClient.invalidateQueries({ queryKey: ["users"] });
                }}
                disabled={user.role === "user"}
              >
                Set as User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="mb-4 text-2xl font-bold">Users</h1>
        <div className="text-red-500">Error loading users: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <DataTable
        columns={columns}
        data={(data as any)?.data || []}
        isLoading={isLoading}
        rowCount={data?.total || 0}
        pagination={{ pageIndex: page - 1, pageSize: limit }}
        onPaginationChange={(updater) => {
          const newPagination =
            typeof updater === "function"
              ? updater({ pageIndex: page - 1, pageSize: limit })
              : updater;
          setPage(newPagination.pageIndex + 1);
          setLimit(newPagination.pageSize);
        }}
      />
    </div>
  );
};

export default Users;
