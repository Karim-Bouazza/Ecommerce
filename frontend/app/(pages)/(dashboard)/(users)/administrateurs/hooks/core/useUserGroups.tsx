// "use client";

// import api from "@/app/lib/api-client";
// import { useQuery } from "@tanstack/react-query";
// import type { UserWithGroups } from "../../types";

// export default function useUserGroups(userId: string) {
//   return useQuery<UserWithGroups>({
//     queryKey: ["user-groups", userId],
//     queryFn: async () => {
//       const response = await api.get(`/users/group-to-user/${userId}/`);
//       return response.data;
//     },
//     enabled: !!userId,
//   });
// }
// to-do