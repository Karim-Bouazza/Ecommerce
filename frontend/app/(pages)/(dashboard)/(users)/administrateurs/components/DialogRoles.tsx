"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Role } from "../../roles/types";

interface DialogRolesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  handleSubmit: () => void;
  isPending?: boolean;
  data: Role[] | undefined;
}

export default function DialogRoles({
  open,
  setOpen,
  selected,
  setSelected,
  handleSubmit,
  isPending,
  data,
}: DialogRolesProps) {
  const toggleRole = (roleId: number) => {
    setSelected((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId],
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Command>
          <CommandInput placeholder="Rechercher des rôles..." />
          <CommandList>
            <CommandEmpty>Aucun rôle trouvé.</CommandEmpty>

            <CommandGroup heading={`Rôles (${data?.length ?? 0})`}>
              {data?.map((role) => (
                <CommandItem
                  key={role.id}
                  onSelect={() => toggleRole(role.id)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox checked={selected.includes(role.id)} />
                  {role.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="cursor-pointer"
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
