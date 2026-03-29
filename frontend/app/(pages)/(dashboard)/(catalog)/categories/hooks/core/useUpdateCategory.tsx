"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesKeys } from "./queryKeys";
import { categoryService } from "../../services/category.service";
import type { CategoryPayload } from "../../types";

type UpdateCategoryInput = {
  id: string | number;
  payload: CategoryPayload;
};

export default function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "update"],
    mutationFn: ({ id, payload }: UpdateCategoryInput) =>
      categoryService.update(id, payload),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesKeys.list() }),
        queryClient.invalidateQueries({
          queryKey: categoriesKeys.details(variables.id),
        }),
      ]);
    },
  });
}
