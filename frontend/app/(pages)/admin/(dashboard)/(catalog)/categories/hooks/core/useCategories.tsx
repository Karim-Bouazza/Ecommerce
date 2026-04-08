"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesKeys } from "./queryKeys";
import { categoryService } from "../../services/category.service";

export default function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: () => categoryService.list(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
