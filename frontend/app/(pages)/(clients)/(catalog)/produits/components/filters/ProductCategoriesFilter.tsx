"use client";

import { cn } from "@/lib/utils";
import type { ClientCategoryListItem } from "../../types";

type ProductCategoriesFilterProps = {
  categories: ClientCategoryListItem[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
};

export default function ProductCategoriesFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: ProductCategoriesFilterProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Catégories
      </h2>

      <ul className="mt-4 space-y-1">
        <li>
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer",
              selectedCategoryId === null
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted",
            )}
          >
            <span>Toutes les catégories</span>
          </button>
        </li>

        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                <span className="truncate">{category.name}</span>
                <span className="ml-3 text-xs text-muted-foreground">
                  {category.products_count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
