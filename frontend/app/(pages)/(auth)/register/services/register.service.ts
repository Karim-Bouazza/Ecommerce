import axios from "axios";
import api from "@/app/lib/api";

type AuthUser = {
    id: number;
    name: string;
    email: string;
};

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type RegisterResponse = {
    message: string;
    data: {
        user: AuthUser;
    };
};

class RegisterService {
    async getCsrfCookie() {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });
    }

    async register(payload: RegisterPayload): Promise<AuthUser> {
        await this.getCsrfCookie();
        const { data } = await api.post<RegisterResponse>("/api/register/", payload);
        return data.data.user;
    }
}

export const registerService = new RegisterService();

export function getRegisterErrorMessage(error: unknown, fallback: string) {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim().length > 0) {
        return message;
    }

    const validationErrors = error.response?.data?.errors;
    if (validationErrors && typeof validationErrors === "object") {
        const firstKey = Object.keys(validationErrors)[0];
        const firstError = firstKey
            ? (validationErrors[firstKey] as string[] | undefined)?.[0]
            : undefined;

        if (typeof firstError === "string" && firstError.trim().length > 0) {
            return firstError;
        }
    }

    return fallback;
}

export type { RegisterPayload };