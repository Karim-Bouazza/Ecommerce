"use client";

import { useQuery } from "@tanstack/react-query";
import { clientAuthService } from "../services/auth.service";

const authUserQueryKey = ["auth", "user"] as const;

export default function useAuthUser() {
  return useQuery({
    queryKey: authUserQueryKey,
    queryFn: () => clientAuthService.currentUser(),
    staleTime: 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export { authUserQueryKey };
