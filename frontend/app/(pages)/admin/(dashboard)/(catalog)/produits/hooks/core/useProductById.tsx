"use client";

import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "./queryKeys";
import { productService } from "../../services/product.service";

export default function useProductById(productId: string | number) {
  return useQuery({
    queryKey: productsKeys.details(productId),
    queryFn: () => productService.getById(productId),
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
