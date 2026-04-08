"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserByIdService } from "../../services/get-user-by-id.service";

export default function useUserById(userId: string) {
  return useQuery({
    queryKey: ["users", "details", userId],
    queryFn: () => getUserByIdService.getById(userId),
    enabled: Boolean(userId),
  });
}
