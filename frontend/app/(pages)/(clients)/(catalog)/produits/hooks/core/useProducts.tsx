"use client";

import { useQuery } from "@tanstack/react-query";
import { clientProductsKeys } from "./queryKeys";
import { clientProductService } from "../../services/product.service";

export default function useProducts() {
  return useQuery({
    queryKey: clientProductsKeys.list(),
    queryFn: () => clientProductService.list(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
