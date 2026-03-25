"use client";

// to-do
// import api from "@/app/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/api";

export default function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await api.get("/api/users/");
      return users.data;
    },
  });
}
