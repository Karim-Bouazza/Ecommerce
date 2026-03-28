"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createUserService,
    type CreateUserPayload,
} from "../../services/create-user.service";

export default function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["users", "create"],
        mutationFn: (payload: CreateUserPayload) => createUserService.create(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}
