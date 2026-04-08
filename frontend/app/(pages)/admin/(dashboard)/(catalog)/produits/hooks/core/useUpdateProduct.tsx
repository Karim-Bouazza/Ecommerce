"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsKeys } from "./queryKeys";
import { productService } from "../../services/product.service";
import type { ProductPayload } from "../../types";

type UpdateProductInput = {
  id: string | number;
  payload: ProductPayload;
};

export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "update"],
    mutationFn: ({ id, payload }: UpdateProductInput) =>
      productService.update(id, payload),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productsKeys.list() }),
        queryClient.invalidateQueries({
          queryKey: productsKeys.details(variables.id),
        }),
      ]);
    },
  });
}
