"use client";

import Image from "next/image";
import {
  type DragEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImageUp, Upload } from "lucide-react";
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
  mapProductFormToPayload,
  productFormSchema,
} from "@/lib/schemas/product";
import useCategories from "../../categories/hooks/core/useCategories";
import useCreateProduct from "../hooks/core/useCreateProduct";
import TipTapEditor from "./TipTapEditor";
import { normalizeRichTextHtml } from "../utils/richText";

type CreateProductFormState = {
  title: string;
  description: string;
  quantity: string;
  price: string;
  priceAfterDiscount: string;
  mainPhoto: File | null;
  subImage01: File | null;
  subImage02: File | null;
  subImage03: File | null;
  categoryId: string;
  error: string | null;
  imageError: string | null;
  draggingSlot: ImageSlotKey | null;
};

type ImageSlotKey = "mainPhoto" | "subImage01" | "subImage02" | "subImage03";

const INITIAL_FORM_STATE: CreateProductFormState = {
  title: "",
  description: "",
  quantity: "0",
  price: "",
  priceAfterDiscount: "",
  mainPhoto: null,
  subImage01: null,
  subImage02: null,
  subImage03: null,
  categoryId: "",
  error: null,
  imageError: null,
  draggingSlot: null,
};

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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

export default function CreateProductForm() {
  const router = useRouter();
  const mainPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const subImage01InputRef = useRef<HTMLInputElement | null>(null);
  const subImage02InputRef = useRef<HTMLInputElement | null>(null);
  const subImage03InputRef = useRef<HTMLInputElement | null>(null);

  const [formState, setFormState] =
    useState<CreateProductFormState>(INITIAL_FORM_STATE);

  const createProduct = useCreateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const availableCategories = useMemo(() => categories ?? [], [categories]);
  const previewUrls = useMemo(
    () => ({
      mainPhoto: formState.mainPhoto
        ? URL.createObjectURL(formState.mainPhoto)
        : null,
      subImage01: formState.subImage01
        ? URL.createObjectURL(formState.subImage01)
        : null,
      subImage02: formState.subImage02
        ? URL.createObjectURL(formState.subImage02)
        : null,
      subImage03: formState.subImage03
        ? URL.createObjectURL(formState.subImage03)
        : null,
    }),
    [
      formState.mainPhoto,
      formState.subImage01,
      formState.subImage02,
      formState.subImage03,
    ],
  );

  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const setField = <K extends keyof CreateProductFormState>(
    field: K,
    value: CreateProductFormState[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const getSlotLabel = (slot: ImageSlotKey): string => {
    if (slot === "mainPhoto") {
      return "l'image principale";
    }

    return `l'image secondaire ${slot.slice(-2)}`;
  };

  const getInputRefBySlot = (slot: ImageSlotKey) => {
    if (slot === "mainPhoto") {
      return mainPhotoInputRef;
    }

    if (slot === "subImage01") {
      return subImage01InputRef;
    }

    if (slot === "subImage02") {
      return subImage02InputRef;
    }

    return subImage03InputRef;
  };

  const applyImage = (slot: ImageSlotKey, file: File | null) => {
    if (!file) {
      setFormState((prev) => ({
        ...prev,
        [slot]: null,
        imageError: null,
      }));
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      setField(
        "imageError",
        `Format invalide pour ${getSlotLabel(slot)}. Utilisez PNG, JPG ou WEBP.`,
      );
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setField("imageError", `${getSlotLabel(slot)} dépasse 5 Mo.`);
      return;
    }

    setFormState((prev) => ({
      ...prev,
      [slot]: file,
      imageError: null,
    }));
  };

  const handleDrop = (slot: ImageSlotKey, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setField("draggingSlot", null);

    const file = event.dataTransfer.files?.[0] ?? null;
    applyImage(slot, file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setField("error", null);

    const normalizedDescription = normalizeRichTextHtml(formState.description);

    const validation = productFormSchema.safeParse({
      title: formState.title,
      description: normalizedDescription,
      quantity: formState.quantity,
      price: formState.price,
      price_after_discount: formState.priceAfterDiscount,
      main_photo: formState.mainPhoto,
      sub_image_01: formState.subImage01,
      sub_image_02: formState.subImage02,
      sub_image_03: formState.subImage03,
      category_id: formState.categoryId,
    });

    if (!validation.success) {
      setField(
        "error",
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
      router.push(`/admin/produits/${product.id}`);
    } catch (err: unknown) {
      setField("error", getApiErrorMessage(err));
    }
  };

  const renderImageSlot = ({
    slot,
    title,
    previewUrl,
    className,
    isMain = false,
  }: {
    slot: ImageSlotKey;
    title: string;
    previewUrl: string | null;
    className: string;
    isMain?: boolean;
  }) => (
    <div
      className={`relative overflow-hidden rounded-xl border border-dashed transition-colors ${className} ${
        formState.draggingSlot === slot
          ? "border-primary bg-primary/5"
          : "border-border bg-muted/20"
      }`}
      role="button"
      tabIndex={0}
      onDragEnter={(event) => {
        event.preventDefault();
        setField("draggingSlot", slot);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (formState.draggingSlot !== slot) {
          setField("draggingSlot", slot);
        }
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        if (formState.draggingSlot === slot) {
          setField("draggingSlot", null);
        }
      }}
      onDrop={(event) => handleDrop(slot, event)}
      onClick={() => getInputRefBySlot(slot).current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          getInputRefBySlot(slot).current?.click();
        }
      }}
      aria-label={`Zone de dépôt pour ${title}`}
    >
      {previewUrl ? (
        <>
          <Image
            src={previewUrl}
            alt={`Aperçu ${title.toLowerCase()}`}
            fill
            sizes={isMain ? "(max-width: 768px) 100vw, 700px" : "280px"}
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2 bg-black/35 p-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                getInputRefBySlot(slot).current?.click();
              }}
            >
              Changer
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                applyImage(slot, null);
              }}
            >
              Retirer
            </Button>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-center">
          <div className="rounded-full border bg-background p-2 text-muted-foreground">
            <ImageUp className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">
              Déposer ou cliquer pour ajouter
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={(event) => {
              event.stopPropagation();
              getInputRefBySlot(slot).current?.click();
            }}
          >
            <Upload className="mr-2 size-4" />
            Sélectionner
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product-title">Titre</Label>
          <Input
            id="product-title"
            value={formState.title}
            onChange={(event) => setField("title", event.target.value)}
            placeholder="Ex: iPhone 16"
            aria-invalid={Boolean(formState.error)}
          />
        </div>

        <div className="space-y-2">
          <Label>Catégorie</Label>
          <Select
            value={formState.categoryId}
            onValueChange={(value) => setField("categoryId", value)}
          >
            <SelectTrigger aria-invalid={Boolean(formState.error)}>
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

      <div className="space-y-2">
        <Label htmlFor="product-description">Description</Label>
        <TipTapEditor
          value={formState.description}
          onChange={(value) => setField("description", value)}
          invalid={Boolean(formState.error)}
          placeholder="Ajoutez une description riche pour ce produit"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="product-quantity">Quantité</Label>
          <Input
            id="product-quantity"
            type="number"
            min={0}
            step={1}
            value={formState.quantity}
            onChange={(event) => setField("quantity", event.target.value)}
            aria-invalid={Boolean(formState.error)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-price">Prix</Label>
          <Input
            id="product-price"
            type="number"
            min={0}
            step="0.01"
            value={formState.price}
            onChange={(event) => setField("price", event.target.value)}
            placeholder="Ex: 3999"
            aria-invalid={Boolean(formState.error)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-discount">
            Prix après remise (optionnel)
          </Label>
          <Input
            id="product-discount"
            type="number"
            min={0}
            step="0.01"
            value={formState.priceAfterDiscount}
            onChange={(event) =>
              setField("priceAfterDiscount", event.target.value)
            }
            placeholder="Ex: 3599"
            aria-invalid={Boolean(formState.error)}
          />
        </div>
      </div>

      <section className="rounded-2xl border p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Label className="text-base font-semibold">Images du produit</Label>
          <p className="text-xs text-muted-foreground">
            PNG, JPG ou WEBP (max 5 Mo)
          </p>
        </div>

        <input
          ref={mainPhotoInputRef}
          id="product-main-photo"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            applyImage("mainPhoto", file);
          }}
        />
        <input
          ref={subImage01InputRef}
          id="product-sub-photo-01"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            applyImage("subImage01", file);
          }}
        />
        <input
          ref={subImage02InputRef}
          id="product-sub-photo-02"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            applyImage("subImage02", file);
          }}
        />
        <input
          ref={subImage03InputRef}
          id="product-sub-photo-03"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            applyImage("subImage03", file);
          }}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr] md:items-stretch">
          {renderImageSlot({
            slot: "mainPhoto",
            title: "Image principale",
            previewUrl: previewUrls.mainPhoto,
            className: "min-h-[348px]",
            isMain: true,
          })}

          <div className="grid grid-cols-1 gap-3">
            {renderImageSlot({
              slot: "subImage01",
              title: "Image secondaire 01",
              previewUrl: previewUrls.subImage01,
              className: "min-h-[108px]",
            })}
            {renderImageSlot({
              slot: "subImage02",
              title: "Image secondaire 02",
              previewUrl: previewUrls.subImage02,
              className: "min-h-[108px]",
            })}
            {renderImageSlot({
              slot: "subImage03",
              title: "Image secondaire 03",
              previewUrl: previewUrls.subImage03,
              className: "min-h-[108px]",
            })}
          </div>
        </div>

        {formState.imageError ? (
          <p className="mt-3 text-sm text-destructive">
            {formState.imageError}
          </p>
        ) : null}
      </section>

      {formState.error ? (
        <p className="text-sm text-destructive">{formState.error}</p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/produits")}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={createProduct.isPending}>
          {createProduct.isPending ? "Création..." : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
