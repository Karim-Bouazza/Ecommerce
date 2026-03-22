import api from "@/app/lib/api";


type LoginPayload = {
    email: string;
    password: string;
};

class LoginService {
    async getCsrfCookie() {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });
    }

    async login(payload: LoginPayload) {
        await this.getCsrfCookie();
        const { data } = await api.post("/api/login/", payload);
        return data.user;
    }
}

export const loginService = new LoginService();

export type { LoginPayload };