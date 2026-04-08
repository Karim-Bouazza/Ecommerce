"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  mapProductFormToPayload,
  productFormSchema,
} from "@/lib/schemas/product";
import useCategories from "../../categories/hooks/core/useCategories";
import useUpdateProduct from "../hooks/core/useUpdateProduct";

type UpdateProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string | number;
  initialData: {
    title: string;
    description: string;
    quantity: number;
    price: string | number;
    price_after_discount: string | number | null;
    main_photo_url: string | null;
    category_id: number | null;
  };
};

function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const firstFieldError = Object.values(
      (err.response?.data?.errors ?? {}) as Record<string, string[]>,
    )
      .flat()
      .find((message) => typeof message === "string" && message.length > 0);

    if (firstFieldError) {
      return firstFieldError;
    }

    const fallbackMessage = err.response?.data?.message;
    if (typeof fallbackMessage === "string" && fallbackMessage.length > 0) {
      return fallbackMessage;
    }
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

export default function UpdateProductDialog({
  open,
  onOpenChange,
  productId,
  initialData,
}: UpdateProductDialogProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [quantity, setQuantity] = useState(String(initialData.quantity));
  const [price, setPrice] = useState(String(initialData.price));
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(
    initialData.price_after_discount === null
      ? ""
      : String(initialData.price_after_discount),
  );
  const [mainPhoto, setMainPhoto] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState(
    initialData.category_id === null ? "" : String(initialData.category_id),
  );
  const [error, setError] = useState<string | null>(null);

  const updateProduct = useUpdateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const availableCategories = useMemo(() => categories ?? [], [categories]);

  useEffect(() => {
    setTitle(initialData.title);
    setDescription(initialData.description);
    setQuantity(String(initialData.quantity));
    setPrice(String(initialData.price));
    setPriceAfterDiscount(
      initialData.price_after_discount === null
        ? ""
        : String(initialData.price_after_discount),
    );
    setCategoryId(
      initialData.category_id === null ? "" : String(initialData.category_id),
    );
    setMainPhoto(null);
    setError(null);
  }, [initialData, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validation = productFormSchema.safeParse({
      title,
      description,
      quantity,
      price,
      price_after_discount: priceAfterDiscount,
      main_photo: mainPhoto,
      category_id: categoryId,
    });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message ??
          "Une erreur est survenue. Veuillez réessayer.",
      );
      return;
    }

    try {
      const product = await updateProduct.mutateAsync({
        id: productId,
        payload: mapProductFormToPayload(validation.data),
      });

      toast.success(`Produit ${product.title} mis à jour avec succès.`);
      onOpenChange(false);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-h-screen overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Modifier le produit</SheetTitle>
          <SheetDescription>
            Mettez à jour les informations du produit.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-4 px-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="update-product-title">Titre</Label>
            <Input
              id="update-product-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: iPhone 16"
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-product-description">Description</Label>
            <textarea
              id="update-product-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description du produit"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="update-product-quantity">Quantité</Label>
              <Input
                id="update-product-quantity"
                type="number"
                min={0}
                step={1}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                aria-invalid={Boolean(error)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-product-price">Prix</Label>
              <Input
                id="update-product-price"
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                aria-invalid={Boolean(error)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="update-product-discount">
                Prix après remise (optionnel)
              </Label>
              <Input
                id="update-product-discount"
                type="number"
                min={0}
                step="0.01"
                value={priceAfterDiscount}
                onChange={(event) => setPriceAfterDiscount(event.target.value)}
                aria-invalid={Boolean(error)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-product-main-photo">
                Photo principale (optionnel)
              </Label>
              <Input
                id="update-product-main-photo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setMainPhoto(file);
                }}
                aria-invalid={Boolean(error)}
              />
              {initialData.main_photo_url ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Photo actuelle
                  </p>
                  <img
                    src={initialData.main_photo_url}
                    alt="Photo actuelle du produit"
                    className="h-24 w-24 rounded-md object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger aria-invalid={Boolean(error)}>
                  <SelectValue
                    placeholder={
                      isLoadingCategories
                        ? "Chargement des catégories..."
                        : "Sélectionnez une catégorie"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <SheetFooter className="px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateProduct.isPending}>
              {updateProduct.isPending ? "Enregistrement..." : "Mettre à jour"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
