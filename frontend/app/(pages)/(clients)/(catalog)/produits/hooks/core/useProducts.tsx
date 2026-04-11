"use client";

import { useQuery } from "@tanstack/react-query";
import { clientProductsKeys } from "./queryKeys";
import { clientProductService } from "../../services/product.service";

type UseProductsParams = {
  categoryId?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

export default function useProducts(params: UseProductsParams = {}) {
  const { categoryId, minPrice, maxPrice } = params;

  return useQuery({
    queryKey: clientProductsKeys.list({ categoryId, minPrice, maxPrice }),
    queryFn: () =>
      clientProductService.list({ categoryId, minPrice, maxPrice }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
