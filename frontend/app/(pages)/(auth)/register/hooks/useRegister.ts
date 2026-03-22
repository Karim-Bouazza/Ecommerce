"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerService, RegisterPayload } from "../services/register.service";

const authUserQueryKey = ["auth", "user"] as const;

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: (payload: RegisterPayload) => registerService.register(payload),
        onSuccess: (user) => {
            queryClient.setQueryData(authUserQueryKey, user);
        },
    });
}