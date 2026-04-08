import api from "@/app/lib/api";
import type {
    ListOrdersParams,
    OrderDetails,
    OrderDetailsResponse,
    OrderListItem,
    OrdersListResponse,
} from "../types";

class OrderService {
    async list(params: ListOrdersParams = {}): Promise<OrderListItem[]> {
        const { data } = await api.get<OrdersListResponse>("/api/orders", {
            params,
            headers: {
                Accept: "application/json",
            },
        });

        return Array.isArray(data.data) ? data.data : [];
    }

    async getById(id: string | number): Promise<OrderDetails> {
        const { data } = await api.get<OrderDetailsResponse>(`/api/orders/${id}`, {
            headers: {
                Accept: "application/json",
            },
        });

        return data.data;
    }
}

export const orderService = new OrderService();
