"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import useProductById from "../hooks/core/useProductById";
import ProductMedia from "../components/detail/ProductMedia";
import ProductSummary from "../components/detail/ProductSummary";
import OrderForm from "../components/detail/OrderForm";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = String(params.id ?? "");

  const { data: product, isLoading, isError } = useProductById(productId);

  if (isLoading) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-card p-6 text-center text-muted-foreground">
          Chargement du produit...
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-card p-6 text-center">
          <p className="text-destructive">Impossible de charger ce produit.</p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/produits">Retour aux produits</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 sm:py-9">
      <div className="mx-auto w-full max-w-6xl space-y-3.5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Home / Shop / {product.title}
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/produits">Retour</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[0.9fr_1.1fr]">
          <ProductMedia product={product} />

          <div className="space-y-3.5">
            <ProductSummary product={product} />
            <OrderForm productId={product.id} maxQuantity={product.quantity} />
          </div>
        </div>
      </div>
    </main>
  );
}
