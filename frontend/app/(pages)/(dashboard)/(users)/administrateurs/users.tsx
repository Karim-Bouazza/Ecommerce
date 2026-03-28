"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import useUsers from "./hooks/core/useUsers";
import TableContainer from "@/app/components/ui/common/Table/TableContainer";
import TableHeaderComponent from "@/app/components/ui/common/Table/TableHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/common/Table/TablePrimitives";
import { administrateursColumns } from "./data";
import TableHeaderPage from "@/app/components/ui/common/Table/TableHeaderPage";
import { useRouter } from "next/navigation";
import CreateUserModal from "./components/CreateUserModal";

type UserListRow = {
  id: number;
  name: string;
  email: string;
  role: string | null;
};

type UsersTableProps = {
  isLoading: boolean;
  isError: boolean;
  users: UserListRow[];
  page: number;
  onViewUser: (userId: number) => void;
};

const UsersTable = React.memo(function UsersTable({
  isLoading,
  isError,
  users,
  page,
  onViewUser,
}: UsersTableProps) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl">
      <Table className="w-full table-auto">
        <TableHeaderComponent columns={administrateursColumns} />

        <TableBody className="text-left">
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Chargement des administrateurs...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-destructive"
              >
                Une erreur est survenue lors du chargement des administrateurs.
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Aucun administrateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index: number) => (
              <TableRow key={user.id ?? index} className="h-12">
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{user.name || "-"}</TableCell>
                <TableCell className="min-w-[260px]">
                  {user.email || "-"}
                </TableCell>
                <TableCell>{user.role || "-"}</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" onClick={() => onViewUser(user.id)}>
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default function Users() {
  const router = useRouter();

  const { data, isLoading, isError } = useUsers();
  const users: UserListRow[] = data?.data ?? [];

  const handleViewUser = useCallback(
    (userId: number) => {
      router.push(`/administrateurs/${userId}`);
    },
    [router],
  );

  const handlePrevious = () => {
    console.log("Previous page");
  };
  const handleNext = () => {
    console.log("Next page");
  };
  const page = 1;
  const total = 100;

  return (
    <div className="w-full min-w-0">
      <TableContainer
        handlePaginationPreviousChange={handlePrevious}
        handlePaginationNextChange={handleNext}
        page={page}
        total={total}
      >
        <TableHeaderPage title="Administrateurs">
          <CreateUserModal />
        </TableHeaderPage>

        <UsersTable
          isLoading={isLoading}
          isError={isError}
          users={users}
          page={page}
          onViewUser={handleViewUser}
        />
      </TableContainer>
    </div>
  );
}
