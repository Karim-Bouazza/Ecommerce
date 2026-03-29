"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesKeys } from "./queryKeys";
import { categoryService } from "../../services/category.service";
import type { CategoryPayload } from "../../types";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "create"],
    mutationFn: (payload: CategoryPayload) => categoryService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: categoriesKeys.list() });
    },
  });
}
