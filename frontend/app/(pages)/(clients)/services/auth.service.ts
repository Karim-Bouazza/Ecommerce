import axios from "axios";
import api from "@/app/lib/api";

export type ClientAuthUser = {
    id: number;
    name: string;
    email: string;
};

class ClientAuthService {
    async currentUser(): Promise<ClientAuthUser | null> {
        try {
            const { data } = await api.get<ClientAuthUser>("/api/user", {
                headers: {
                    Accept: "application/json",
                },
            });

            return data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                return null;
            }

            throw error;
        }
    }

    async logout(): Promise<void> {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });

        await api.post(
            "/api/logout",
            {},
            {
                headers: {
                    Accept: "application/json",
                },
            },
        );
    }
}

export const clientAuthService = new ClientAuthService();
