import api from "@/app/lib/api";
import type {
    ClientProductDetails,
    ClientProductDetailsResponse,
    ClientProductListItem,
    ClientProductsResponse,
} from "../types";

type ClientProductListParams = {
    categoryId?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
};

class ClientProductService {
    async list(params: ClientProductListParams = {}): Promise<ClientProductListItem[]> {
        const queryParams: Record<string, number> = {};

        if (params.categoryId) {
            queryParams.category = params.categoryId;
        }

        if (params.minPrice !== null && params.minPrice !== undefined) {
            queryParams.min_price = params.minPrice;
        }

        if (params.maxPrice !== null && params.maxPrice !== undefined) {
            queryParams.max_price = params.maxPrice;
        }

        const { data } = await api.get<ClientProductsResponse>("/api/shop/products", {
            headers: {
                Accept: "application/json",
            },
            params: queryParams,
        });

        return Array.isArray(data.data) ? data.data : [];
    }

    async getById(id: string | number): Promise<ClientProductDetails> {
        const { data } = await api.get<ClientProductDetailsResponse>(
            `/api/shop/products/${id}`,
            {
                headers: {
                    Accept: "application/json",
                },
            },
        );

        return data.data;
    }
}

export const clientProductService = new ClientProductService();
