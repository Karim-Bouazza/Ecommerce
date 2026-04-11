"use client";

import { useQuery } from "@tanstack/react-query";
import { clientCategoriesKeys } from "./queryKeys";
import { clientCategoryService } from "../../services/category.service";

export default function useCategories() {
  return useQuery({
    queryKey: clientCategoriesKeys.list(),
    queryFn: () => clientCategoryService.list(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
