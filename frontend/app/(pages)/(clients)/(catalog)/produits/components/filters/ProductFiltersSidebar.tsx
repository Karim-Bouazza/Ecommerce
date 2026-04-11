"use client";

import useCategories from "../../hooks/core/useCategories";
import ProductCategoriesFilter from "./ProductCategoriesFilter";
import ProductPriceFilter from "./ProductPriceFilter";

type ProductFiltersSidebarProps = {
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  selectedMinPrice: number | null;
  selectedMaxPrice: number | null;
  onChangePriceRange: (payload: {
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
};

export default function ProductFiltersSidebar({
  selectedCategoryId,
  onSelectCategory,
  selectedMinPrice,
  selectedMaxPrice,
  onChangePriceRange,
}: ProductFiltersSidebarProps) {
  const { data, isLoading, isError } = useCategories();
  const categories = data?.categories ?? [];
  const minBound = data?.prices_range?.min_price ?? 0;
  const maxBound = data?.prices_range?.max_price ?? 3000;

  return (
    <aside className="w-full lg:sticky lg:top-24">
      <div className="rounded-2xl border bg-card p-4">
        {isLoading ? (
          <div className="text-sm text-muted-foreground">
            Chargement des catégories...
          </div>
        ) : isError ? (
          <div className="text-sm text-destructive">
            Impossible de charger les catégories.
          </div>
        ) : (
          <ProductCategoriesFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
          />
        )}

        <ProductPriceFilter
          minPrice={selectedMinPrice}
          maxPrice={selectedMaxPrice}
          onChange={onChangePriceRange}
          minBound={Math.floor(minBound)}
          maxBound={Math.ceil(maxBound)}
        />
      </div>
    </aside>
  );
}
