"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsKeys } from "./queryKeys";
import { productService } from "../../services/product.service";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "delete"],
    mutationFn: (id: string | number) => productService.remove(id),
    onSuccess: async (_data, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productsKeys.list() }),
        queryClient.removeQueries({ queryKey: productsKeys.details(id) }),
      ]);
    },
  });
}
