"use client";

import { clientProductsCopy } from "./data";
import useProducts from "./hooks/core/useProducts";
import ProductCard from "./components/ProductCard";

function formatPrice(value: string | number | null): string {
  if (value === null) {
    return "-";
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return "-";
  }

  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(parsed);
}

export default function Products() {
  const { data, isLoading, isError } = useProducts();
  const products = data ?? [];

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {clientProductsCopy.subtitle}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {clientProductsCopy.title}
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
            Chargement des produits...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border bg-card p-8 text-center text-destructive">
            Une erreur est survenue lors du chargement des produits.
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
            {clientProductsCopy.emptyState}
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
