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
import useProductById from "../hooks/core/useProductById";
import useDeleteProduct from "../hooks/core/useDeleteProduct";
import UpdateProductDialog from "../components/UpdateProductDialog";

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

function formatCurrency(value: string | number | null): string {
  if (value === null) {
    return "-";
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return "-";
  }

  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(numericValue);
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = String(params.id ?? "");

  const { data: product, isLoading, isError } = useProductById(productId);
  const deleteProduct = useDeleteProduct();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const canDelete = useMemo(
    () => Boolean(productId) && !deleteProduct.isPending,
    [productId, deleteProduct.isPending],
  );

  const handleDelete = async () => {
    if (!productId) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(productId);
      toast.success("Produit supprimé avec succès.");
      router.push("/admin/produits");
    } catch {
      toast.error("Impossible de supprimer le produit.");
    }
  };

  if (isLoading) {
    return <Loading message="Chargement du produit..." />;
  }

  if (isError || !product) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Impossible de charger ce produit</CardTitle>
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
            <CardTitle className="text-2xl">Détail produit</CardTitle>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/produits")}
            >
              Retour à la liste
            </Button>
          </div>
          <CardDescription>
            Informations détaillées du produit sélectionné.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3 text-sm">
            {product.main_photo_url ? (
              <div className="pb-2">
                <span className="font-medium">Photo principale:</span>
                <div className="mt-2">
                  <img
                    src={product.main_photo_url}
                    alt={`Photo du produit ${product.title}`}
                    className="h-32 w-32 rounded-md object-cover"
                  />
                </div>
              </div>
            ) : null}
            <p>
              <span className="font-medium">Titre:</span> {product.title}
            </p>
            <p>
              <span className="font-medium">Description:</span>{" "}
              {product.description || "-"}
            </p>
            <p>
              <span className="font-medium">Quantité:</span> {product.quantity}
            </p>
            <p>
              <span className="font-medium">Prix:</span>{" "}
              {formatCurrency(product.price)}
            </p>
            <p>
              <span className="font-medium">Prix remisé:</span>{" "}
              {formatCurrency(product.price_after_discount)}
            </p>
            <p>
              <span className="font-medium">Catégorie:</span>{" "}
              {product.category?.name ?? "-"}
            </p>
            <p>
              <span className="font-medium">Créé le:</span>{" "}
              {formatDate(product.created_at)}
            </p>
            <p>
              <span className="font-medium">Modifié le:</span>{" "}
              {formatDate(product.updated_at)}
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

      <UpdateProductDialog
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        productId={product.id}
        initialData={{
          title: product.title,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
          price_after_discount: product.price_after_discount,
          main_photo_url: product.main_photo_url,
          category_id: product.category?.id ?? null,
        }}
      />

      <ConfirmDelete
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Voulez-vous vraiment supprimer ce produit ?"
        description="Cette action est irréversible. Le produit sera supprimé définitivement."
        cancelText="Annuler"
        confirmText={deleteProduct.isPending ? "Suppression..." : "Supprimer"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </PageContainer>
  );
}
