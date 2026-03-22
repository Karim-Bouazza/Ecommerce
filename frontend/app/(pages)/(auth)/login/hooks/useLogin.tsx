"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService, LoginPayload } from "../services/login.service";

const authUserQueryKey = ["auth", "user"] as const;

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (payload: LoginPayload) => loginService.login(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(authUserQueryKey, user);
    },
  });
}
