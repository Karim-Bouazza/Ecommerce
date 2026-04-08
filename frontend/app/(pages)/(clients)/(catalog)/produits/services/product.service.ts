import api from "@/app/lib/api";
import type {
    ClientProductDetails,
    ClientProductDetailsResponse,
    ClientProductListItem,
    ClientProductsResponse,
} from "../types";

class ClientProductService {
    async list(): Promise<ClientProductListItem[]> {
        const { data } = await api.get<ClientProductsResponse>("/api/shop/products", {
            headers: {
                Accept: "application/json",
            },
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
