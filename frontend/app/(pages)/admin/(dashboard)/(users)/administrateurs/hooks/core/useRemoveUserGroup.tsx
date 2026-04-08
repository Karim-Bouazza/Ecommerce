// "use client";

// import api from "@/app/lib/api-client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export default function useRemoveUserGroup(userId: string) {
//   const queryClient = useQueryClient();

//   return useMutation<void, Error, number>({
//     mutationFn: async (groupId) => {
//       await api.delete(`/users/group-to-user/${userId}/remove_group/`, {
//         data: { group_ids: [groupId] },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["user-groups", userId] });
//     },
//   });
// }
// to-do
