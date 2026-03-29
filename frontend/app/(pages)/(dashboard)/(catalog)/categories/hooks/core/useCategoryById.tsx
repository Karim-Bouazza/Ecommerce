"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesKeys } from "./queryKeys";
import { categoryService } from "../../services/category.service";

export default function useCategoryById(categoryId: string | number) {
  return useQuery({
    queryKey: categoriesKeys.details(categoryId),
    queryFn: () => categoryService.getById(categoryId),
    enabled: Boolean(categoryId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
