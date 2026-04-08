"use client";

import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "./queryKeys";
import { productService } from "../../services/product.service";

export default function useProducts() {
  return useQuery({
    queryKey: productsKeys.list(),
    queryFn: () => productService.list(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
