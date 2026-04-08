"use client";

import { FormEvent, useMemo, useState } from "react";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  mapProductFormToPayload,
  productFormSchema,
} from "@/lib/schemas/product";
import useCategories from "../../categories/hooks/core/useCategories";
import useCreateProduct from "../hooks/core/useCreateProduct";

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

export default function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [price, setPrice] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [mainPhoto, setMainPhoto] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCreateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const availableCategories = useMemo(() => categories ?? [], [categories]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setQuantity("0");
    setPrice("");
    setPriceAfterDiscount("");
    setMainPhoto(null);
    setCategoryId("");
    setError(null);
  };

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
      const product = await createProduct.mutateAsync(
        mapProductFormToPayload(validation.data),
      );

      toast.success(`Produit ${product.title} créé avec succès.`);
      resetForm();
      setOpen(false);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">Créer produit</Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Créer un produit</SheetTitle>
        </SheetHeader>

        <form className="space-y-4 px-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="product-title">Titre</Label>
            <Input
              id="product-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: iPhone 16"
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <textarea
              id="product-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description du produit"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-quantity">Quantité</Label>
              <Input
                id="product-quantity"
                type="number"
                min={0}
                step={1}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                aria-invalid={Boolean(error)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price">Prix</Label>
              <Input
                id="product-price"
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Ex: 3999"
                aria-invalid={Boolean(error)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-discount">
                Prix après remise (optionnel)
              </Label>
              <Input
                id="product-discount"
                type="number"
                min={0}
                step="0.01"
                value={priceAfterDiscount}
                onChange={(event) => setPriceAfterDiscount(event.target.value)}
                placeholder="Ex: 3599"
                aria-invalid={Boolean(error)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-main-photo">
                Photo principale (optionnel)
              </Label>
              <Input
                id="product-main-photo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setMainPhoto(file);
                }}
                aria-invalid={Boolean(error)}
              />
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
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createProduct.isPending}>
              {createProduct.isPending ? "Création..." : "Créer"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
