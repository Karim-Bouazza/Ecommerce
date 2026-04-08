"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { clientProductsCopy } from "../data";
import type { ClientProductListItem } from "../types";

type ProductCardProps = {
  product: ClientProductListItem;
  formatPrice: (value: string | number | null) => string;
};

export default function ProductCard({
  product,
  formatPrice,
}: ProductCardProps) {
  const hasDiscount =
    product.price_after_discount !== null &&
    Number(product.price_after_discount) < Number(product.price);

  return (
    <article className="group overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-3/4 overflow-hidden bg-muted/30">
        {product.main_photo_url ? (
          <img
            src={product.main_photo_url}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            {clientProductsCopy.missingPhoto}
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-black/35 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <Button
            asChild
            className="pointer-events-auto h-9 rounded-full px-5 text-sm font-medium text-white"
          >
            <Link href={`/produits/${product.id}`}>Commander</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <h2 className="line-clamp-1 text-base font-medium">{product.title}</h2>
        <div className="text-right">
          {hasDiscount ? (
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm font-semibold text-primary">
                {formatPrice(product.price_after_discount)}
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
