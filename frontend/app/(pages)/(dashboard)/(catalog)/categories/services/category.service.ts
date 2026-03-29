import api from "@/app/lib/api";
import type {
    CategoryDetails,
    CategoryListItem,
    CategoryPayload,
} from "../types";

type CategoriesListResponse = {
    data: CategoryListItem[];
};

type CategoryResponse = {
    data: CategoryDetails;
};

class CategoryService {
    private async getCsrfCookie(): Promise<void> {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });
    }

    async list(): Promise<CategoryListItem[]> {
        const { data } = await api.get<CategoriesListResponse>("/api/categories");
        return data.data;
    }

    async getById(id: string | number): Promise<CategoryDetails> {
        const { data } = await api.get<CategoryResponse>(`/api/categories/${id}`);
        return data.data;
    }

    async create(payload: CategoryPayload): Promise<CategoryDetails> {
        await this.getCsrfCookie();
        const { data } = await api.post<CategoryResponse>("/api/categories", payload);
        return data.data;
    }

    async update(
        id: string | number,
        payload: CategoryPayload,
    ): Promise<CategoryDetails> {
        await this.getCsrfCookie();
        const { data } = await api.patch<CategoryResponse>(
            `/api/categories/${id}`,
            payload,
        );
        return data.data;
    }

    async remove(id: string | number): Promise<void> {
        await this.getCsrfCookie();
        await api.delete(`/api/categories/${id}`);
    }
}

export const categoryService = new CategoryService();
