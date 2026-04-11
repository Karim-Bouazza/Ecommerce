"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clientProductsCopy } from "./data";
import useProducts from "./hooks/core/useProducts";
import ProductCard from "./components/ProductCard";
import ProductFiltersSidebar from "./components/filters/ProductFiltersSidebar";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategoryId = useMemo(() => {
    const rawCategory = searchParams.get("category");

    if (!rawCategory) {
      return null;
    }

    const parsed = Number(rawCategory);
    return Number.isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  const selectedMinPrice = useMemo(() => {
    const rawMinPrice = searchParams.get("min_price");
    if (!rawMinPrice) {
      return null;
    }

    const parsed = Number(rawMinPrice);
    return Number.isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  const selectedMaxPrice = useMemo(() => {
    const rawMaxPrice = searchParams.get("max_price");
    if (!rawMaxPrice) {
      return null;
    }

    const parsed = Number(rawMaxPrice);
    return Number.isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  const { data, isLoading, isError } = useProducts({
    categoryId: selectedCategoryId,
    minPrice: selectedMinPrice,
    maxPrice: selectedMaxPrice,
  });
  const products = data ?? [];

  const handleSelectCategory = (categoryId: number | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (categoryId === null) {
      nextParams.delete("category");
    } else {
      nextParams.set("category", String(categoryId));
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleChangePriceRange = (payload: {
    minPrice: number | null;
    maxPrice: number | null;
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (payload.minPrice === null) {
      nextParams.delete("min_price");
    } else {
      nextParams.set("min_price", String(payload.minPrice));
    }

    if (payload.maxPrice === null) {
      nextParams.delete("max_price");
    } else {
      nextParams.set("max_price", String(payload.maxPrice));
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
          <ProductFiltersSidebar
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
            selectedMinPrice={selectedMinPrice}
            selectedMaxPrice={selectedMaxPrice}
            onChangePriceRange={handleChangePriceRange}
          />

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
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </main>
  );
}
