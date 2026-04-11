"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientAuthService } from "../services/auth.service";
import { authUserQueryKey } from "./useAuthUser";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: () => clientAuthService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(authUserQueryKey, null);
      queryClient.invalidateQueries({ queryKey: authUserQueryKey });
    },
  });
}
