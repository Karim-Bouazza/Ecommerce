"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ClientProductDetails } from "../../types";

type ProductMediaProps = {
  product: ClientProductDetails;
};

export default function ProductMedia({ product }: ProductMediaProps) {
  const subImagesFromArray = useMemo(
    () =>
      Array.isArray(product.sub_images)
        ? product.sub_images.filter(
            (value): value is string =>
              typeof value === "string" && value.trim().length > 0,
          )
        : [],
    [product.sub_images],
  );

  const galleryImages = useMemo(() => {
    const values = [product.main_photo_url, ...subImagesFromArray].filter(
      (value): value is string => Boolean(value && value.trim().length > 0),
    );

    return Array.from(new Set(values));
  }, [product.main_photo_url, subImagesFromArray]);

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const selectedImage =
    selectedImageUrl && galleryImages.includes(selectedImageUrl)
      ? selectedImageUrl
      : (galleryImages[0] ?? null);

  const orderedGalleryImages = selectedImage
    ? [
        selectedImage,
        ...galleryImages.filter((image) => image !== selectedImage),
      ]
    : galleryImages;

  const mainImage = orderedGalleryImages[0] ?? null;
  const visibleThumbnails = orderedGalleryImages.slice(1, 4);

  return (
    <section className="rounded-2xl border bg-card p-2.5">
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted/30">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Photo indisponible
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 3 }).map((_, index) => {
          const thumbnail = visibleThumbnails[index] ?? null;
          const isActive = Boolean(thumbnail && thumbnail === mainImage);

          return (
            <div
              key={index}
              className="relative aspect-4/5 overflow-hidden rounded-md border bg-muted/30"
            >
              {thumbnail ? (
                <button
                  type="button"
                  className={`relative h-full w-full cursor-pointer transition ${
                    isActive ? "ring-2 ring-primary ring-offset-1" : ""
                  }`}
                  onClick={() => setSelectedImageUrl(thumbnail)}
                  aria-label={`Afficher l'image ${index + 1} du produit`}
                  aria-pressed={isActive}
                >
                  <Image
                    src={thumbnail}
                    alt={`${product.title} miniature ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 180px"
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
