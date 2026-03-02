import { getUsers } from "@/app/services/api/UsersService";
import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  // return useQuery(["users"], async () => {

  // }
  const users = getUsers();
//   console.log(users);
}
