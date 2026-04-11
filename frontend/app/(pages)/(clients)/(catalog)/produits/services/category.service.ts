import api from "@/app/lib/api";
import type { ClientProductFilters, ClientProductFiltersResponse } from "../types";

class ClientCategoryService {
    async list(): Promise<ClientProductFilters> {
        const { data } = await api.get<ClientProductFiltersResponse>("/api/shop/products/filters", {
            headers: {
                Accept: "application/json",
            },
        });

        return {
            categories: Array.isArray(data.data?.categories) ? data.data.categories : [],
            prices_range: {
                min_price: Number(data.data?.prices_range?.min_price ?? 0),
                max_price: Number(data.data?.prices_range?.max_price ?? 0),
            },
        };
    }
}

export const clientCategoryService = new ClientCategoryService();
