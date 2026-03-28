import api from "@/app/lib/api";
import type { UserDetails } from "../types";

type GetUserByIdResponse = {
    data: UserDetails;
};

class GetUserByIdService {
    async getById(userId: string | number): Promise<UserDetails> {
        const { data } = await api.get<GetUserByIdResponse>(`/api/users/${userId}`);
        return data.data;
    }
}

export const getUserByIdService = new GetUserByIdService();
