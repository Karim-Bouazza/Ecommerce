import api from "@/app/lib/api";

export type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    province?: string | null;
    city?: string | null;
    role: string;
};

export type CreatedUser = {
    id: number;
    name: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    username: string;
    phone_number: string | null;
    province: string | null;
    city: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
};

type CreateUserResponse = {
    data: CreatedUser;
};

class CreateUserService {
    async getCsrfCookie() {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });
    }

    async create(payload: CreateUserPayload): Promise<CreatedUser> {
        await this.getCsrfCookie();
        const { data } = await api.post<CreateUserResponse>("/api/users/", payload);
        return data.data;
    }
}

export const createUserService = new CreateUserService();
