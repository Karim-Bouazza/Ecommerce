// "use client";

// import api from "@/app/lib/api-client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { UserWithGroups } from "../../types";

// export default function useUpdateUserGroups(userId: string) {
//   const queryClient = useQueryClient();

//   return useMutation<UserWithGroups, Error, number[]>({
//     mutationFn: async (groupsIds) => {
//       const response = await api.patch(`/users/group-to-user/${userId}/`, {
//         groups_ids: groupsIds,
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["user-groups", userId] });
//     },
//   });
// }

// to-do