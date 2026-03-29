"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useUpdateCategory from "../hooks/core/useUpdateCategory";

type UpdateCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string | number;
  initialName: string;
};

export default function UpdateCategoryDialog({
  open,
  onOpenChange,
  categoryId,
  initialName,
}: UpdateCategoryDialogProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = useUpdateCategory();

  useEffect(() => {
    setName(initialName);
    setError(null);
  }, [initialName, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalizedName = name.trim();
    if (!normalizedName) {
      setError("Le nom de la catégorie est requis.");
      return;
    }

    try {
      const category = await updateCategory.mutateAsync({
        id: categoryId,
        payload: { name: normalizedName },
      });
      toast.success(`Catégorie ${category.name} mise à jour avec succès.`);
      onOpenChange(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.errors?.name?.[0];
        if (typeof serverMessage === "string" && serverMessage.length > 0) {
          setError(serverMessage);
          return;
        }

        const fallbackMessage = err.response?.data?.message;
        if (typeof fallbackMessage === "string" && fallbackMessage.length > 0) {
          setError(fallbackMessage);
          return;
        }
      }

      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Modifier la catégorie</SheetTitle>
          <SheetDescription>
            Mettez à jour les informations de la catégorie.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-4 px-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="update-category-name">Nom</Label>
            <Input
              id="update-category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Téléphonie"
              aria-invalid={Boolean(error)}
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>

          <SheetFooter className="px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateCategory.isPending}>
              {updateCategory.isPending ? "Enregistrement..." : "Mettre à jour"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
