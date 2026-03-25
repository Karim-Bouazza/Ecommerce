"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import TableContainer from "@/app/components/ui/common/Table/TableContainer";
import TableHeaderPage from "@/app/components/ui/common/Table/TableHeaderPage";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "@/app/components/ui/common/Table/TableHeader";
import { ConfirmDelete } from "@/app/components/ui/common/ConfirmDelete";
import useUserGroups from "../hooks/core/useUserGroups";
import useUpdateUserGroups from "../hooks/core/useUpdateUserGroups";
import useRemoveUserGroup from "../hooks/core/useRemoveUserGroup";
import useRoles from "../../roles/hooks/core/useRoles";
import DialogRoles from "../components/DialogRoles";
import { userGroupsColumns } from "../data";
import { getApiErrorMessage } from "../../roles/utils";
import type { Group } from "../types";

export default function UserDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: user } = useUserGroups(id);
  const { data: allRoles } = useRoles();
  const updateGroups = useUpdateUserGroups(id);
  const removeGroup = useRemoveUserGroup(id);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);

  const groups = user?.groups ?? [];

  useEffect(() => {
    if (open && groups.length > 0) {
      setSelected(groups.map((g: Group) => g.id));
    }
  }, [open, groups]);

  const handleSubmit = () => {
    updateGroups.mutate(selected, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Rôles mis à jour avec succès");
      },
      onError: (error) => {
        toast.error(
          getApiErrorMessage(error, "Erreur lors de la mise à jour des rôles"),
        );
      },
    });
  };

  const handleRemoveGroup = () => {
    if (!deletingGroup) return;
    removeGroup.mutate(deletingGroup.id, {
      onSuccess: () => {
        setDeletingGroup(null);
        toast.success("Rôle supprimé avec succès");
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Erreur lors de la suppression"));
      },
    });
  };

  return (
    <>
      <TableContainer
        handlePaginationPreviousChange={() => {}}
        handlePaginationNextChange={() => {}}
        page={1}
        total={groups.length}
        pageSize={groups.length || 1}
      >
        <TableHeaderPage title={`Utilisateur #${id}`}>
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Ajouter rôle
          </Button>
        </TableHeaderPage>

        <div className="overflow-x-auto w-full rounded-xl">
          <Table className="w-full">
            <TableHeaderComponent columns={userGroupsColumns} />

            <TableBody>
              {groups.map((group: Group, index: number) => (
                <TableRow key={group.id} className="h-12">
                  <TableCell className="text-left">{index + 1}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeletingGroup(group)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>

      <DialogRoles
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        handleSubmit={handleSubmit}
        isPending={updateGroups.isPending}
        data={allRoles?.results}
      />

      <ConfirmDelete
        open={!!deletingGroup}
        onOpenChange={(open) => !open && setDeletingGroup(null)}
        title="Supprimer le rôle"
        description={`Êtes-vous sûr de vouloir retirer le rôle "${deletingGroup?.name}" de cet utilisateur ?`}
        cancelText="Annuler"
        confirmText="Supprimer"
        variant="destructive"
        onConfirm={handleRemoveGroup}
      />
    </>
  );
}
