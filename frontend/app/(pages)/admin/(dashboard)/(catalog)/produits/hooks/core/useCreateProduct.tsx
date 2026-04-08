"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsKeys } from "./queryKeys";
import { productService } from "../../services/product.service";
import type { ProductPayload } from "../../types";

export default function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "create"],
    mutationFn: (payload: ProductPayload) => productService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productsKeys.list() });
    },
  });
}
