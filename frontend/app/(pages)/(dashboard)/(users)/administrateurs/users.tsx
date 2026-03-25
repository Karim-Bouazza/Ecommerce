"use client";

import { Button } from "@/components/ui/button";
import useUsers from "./hooks/core/useUsers";
import TableContainer from "@/app/components/ui/common/Table/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableHeaderPage from "@/app/components/ui/common/Table/TableHeaderPage";
import { useRouter } from "next/navigation";

export default function Users() {
  const router = useRouter();

  const { data, isLoading, isError } = useUsers();
  const users = data?.data ?? [];

  const handlePrevious = () => {
    console.log("Previous page");
  };
  const handleNext = () => {
    console.log("Next page");
  };
  const page = 1;
  const total = 100;

  const handleUsers = () => {
    console.log("users: ", users);
  };

  return (
    <div className="w-full min-w-0">
      <TableContainer
        handlePaginationPreviousChange={handlePrevious}
        handlePaginationNextChange={handleNext}
        page={page}
        total={total}
      >
        <TableHeaderPage title="Administrateurs" />

        <div className="w-full min-w-0 overflow-x-auto rounded-xl">
          <Table className="w-full table-auto">
            <TableHeader className="[&_tr]:border-b-0 bg-[#f1f6f5]">
              <TableRow>
                <TableHead className="w-[8%]">ID</TableHead>
                <TableHead className="w-[18%]">Utilisateur</TableHead>
                <TableHead className="w-[36%]">Email</TableHead>
                <TableHead className="w-[12%]">Role</TableHead>
                <TableHead className="w-[13%] text-center">Voir</TableHead>
              </TableRow>
            </TableHeader>

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
                    Une erreur est survenue lors du chargement des
                    administrateurs.
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
                users.map((user: any, index: number) => (
                  <TableRow key={user.id ?? index} className="h-12">
                    <TableCell>{(page - 1) * 10 + index + 1}</TableCell>

                    <TableCell>{user.name || "-"}</TableCell>

                    <TableCell className="min-w-[260px]">
                      {user.email || "-"}
                    </TableCell>

                    <TableCell>{user.role || "-"}</TableCell>

                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push(`/administrateurs/${user.id}`)
                        }
                      >
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
