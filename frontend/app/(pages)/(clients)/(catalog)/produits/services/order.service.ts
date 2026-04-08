import api from "@/app/lib/api";
import type {
    ClientCreateOrderPayload,
    ClientCreateOrderResponse,
    ClientOrder,
} from "../types";

class ClientOrderService {
    async create(payload: ClientCreateOrderPayload): Promise<ClientOrder> {
        const { data } = await api.post<ClientCreateOrderResponse | ClientOrder>(
            "/api/shop/orders",
            payload,
            {
                headers: {
                    Accept: "application/json",
                },
            },
        );

        if (typeof data === "object" && data !== null && "data" in data) {
            const wrapped = data as ClientCreateOrderResponse;
            return wrapped.data;
        }

        return data as ClientOrder;
    }
}

export const clientOrderService = new ClientOrderService();
