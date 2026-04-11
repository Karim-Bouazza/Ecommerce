import api from "@/app/lib/api";
import type { ProductDetails, ProductListItem, ProductPayload } from "../types";

type ProductsListResponse = {
    data: ProductListItem[];
};

type ProductResponse = {
    data: ProductDetails;
};

class ProductService {
    private async getCsrfCookie(): Promise<void> {
        await api.get("/sanctum/csrf-cookie", {
            headers: {
                Accept: "application/json",
            },
        });
    }

    async list(): Promise<ProductListItem[]> {
        const { data } = await api.get<ProductsListResponse>("/api/products");
        return data.data;
    }

    async getById(id: string | number): Promise<ProductDetails> {
        const { data } = await api.get<ProductResponse>(`/api/products/${id}`);
        return data.data;
    }

    async create(payload: ProductPayload): Promise<ProductDetails> {
        await this.getCsrfCookie();
        const { data } = await api.post<ProductResponse>(
            "/api/products",
            this.buildFormData(payload),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return data.data;
    }

    async update(
        id: string | number,
        payload: ProductPayload,
    ): Promise<ProductDetails> {
        await this.getCsrfCookie();
        const { data } = await api.patch<ProductResponse>(
            `/api/products/${id}`,
            this.buildFormData(payload),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return data.data;
    }

    async remove(id: string | number): Promise<void> {
        await this.getCsrfCookie();
        await api.delete(`/api/products/${id}`);
    }

    private buildFormData(payload: ProductPayload): FormData {
        const formData = new FormData();

        formData.append("title", payload.title);
        formData.append("description", payload.description);
        formData.append("quantity", String(payload.quantity));
        formData.append("price", String(payload.price));
        formData.append("category_id", String(payload.category_id));

        if (payload.price_after_discount === null || payload.price_after_discount === undefined) {
            formData.append("price_after_discount", "");
        } else {
            formData.append("price_after_discount", String(payload.price_after_discount));
        }

        if (payload.main_photo) {
            formData.append("main_photo", payload.main_photo);
        }

        if (payload.sub_image_01) {
            formData.append("sub_image_01", payload.sub_image_01);
        }

        if (payload.sub_image_02) {
            formData.append("sub_image_02", payload.sub_image_02);
        }

        if (payload.sub_image_03) {
            formData.append("sub_image_03", payload.sub_image_03);
        }

        return formData;
    }
}

export const productService = new ProductService();
