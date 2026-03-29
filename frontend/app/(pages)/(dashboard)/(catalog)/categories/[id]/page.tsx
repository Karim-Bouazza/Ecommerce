"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDelete } from "@/app/components/ui/common/ConfirmDelete";
import Loading from "@/app/components/ui/common/Loading";
import PageContainer from "@/app/components/ui/common/PageContainer";
import useCategoryById from "../hooks/core/useCategoryById";
import useDeleteCategory from "../hooks/core/useDeleteCategory";
import UpdateCategoryDialog from "../components/UpdateCategoryDialog";

function formatDate(value?: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fr-FR");
}

export default function CategoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = String(params.id ?? "");

  const { data: category, isLoading, isError } = useCategoryById(categoryId);
  const deleteCategory = useDeleteCategory();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const canDelete = useMemo(
    () => Boolean(categoryId) && !deleteCategory.isPending,
    [categoryId, deleteCategory.isPending],
  );

  const handleDelete = async () => {
    if (!categoryId) {
      return;
    }

    try {
      await deleteCategory.mutateAsync(categoryId);
      toast.success("Catégorie supprimée avec succès.");
      router.push("/categories");
    } catch {
      toast.error("Impossible de supprimer la catégorie.");
    }
  };

  if (isLoading) {
    return <Loading message="Chargement de la catégorie..." />;
  }

  if (isError || !category) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Impossible de charger cette catégorie</CardTitle>
            <CardDescription>
              Vérifiez l'identifiant ou réessayez plus tard.
            </CardDescription>
          </CardHeader>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-2xl">Détail catégorie</CardTitle>
            <Button
              variant="outline"
              onClick={() => router.push("/categories")}
            >
              Retour à la liste
            </Button>
          </div>
          <CardDescription>
            Informations de base de la catégorie sélectionnée.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Nom:</span> {category.name}
            </p>
            <p>
              <span className="font-medium">Créée le:</span>{" "}
              {formatDate(category.created_at)}
            </p>
            <p>
              <span className="font-medium">Modifiée le:</span>{" "}
              {formatDate(category.updated_at)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsUpdateOpen(true)}>Modifier</Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteOpen(true)}
              disabled={!canDelete}
            >
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>

      <UpdateCategoryDialog
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        categoryId={category.id}
        initialName={category.name}
      />

      <ConfirmDelete
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Voulez-vous vraiment supprimer cette catégorie ?"
        description="Cette action est irréversible. La catégorie sera supprimée définitivement."
        cancelText="Annuler"
        confirmText={deleteCategory.isPending ? "Suppression..." : "Supprimer"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </PageContainer>
  );
}
