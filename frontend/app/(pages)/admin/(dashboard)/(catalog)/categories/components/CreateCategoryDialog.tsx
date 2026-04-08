"use client";

import { FormEvent, useState } from "react";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import useCreateCategory from "../hooks/core/useCreateCategory";

export default function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createCategory = useCreateCategory();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalizedName = name.trim();
    if (!normalizedName) {
      setError("Le nom de la catégorie est requis.");
      return;
    }

    try {
      const category = await createCategory.mutateAsync({
        name: normalizedName,
      });
      toast.success(`Catégorie ${category.name} créée avec succès.`);
      setName("");
      setOpen(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">Créer catégorie</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Créer une catégorie</SheetTitle>
          <SheetDescription>
            Renseignez le nom de la nouvelle catégorie.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-4 px-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="category-name">Nom</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Smartphones"
              aria-invalid={Boolean(error)}
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>

          <SheetFooter className="px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createCategory.isPending}>
              {createCategory.isPending ? "Création..." : "Créer"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
