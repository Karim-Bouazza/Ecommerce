"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesKeys } from "./queryKeys";
import { categoryService } from "../../services/category.service";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "delete"],
    mutationFn: (id: string | number) => categoryService.remove(id),
    onSuccess: async (_data, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesKeys.list() }),
        queryClient.removeQueries({ queryKey: categoriesKeys.details(id) }),
      ]);
    },
  });
}
