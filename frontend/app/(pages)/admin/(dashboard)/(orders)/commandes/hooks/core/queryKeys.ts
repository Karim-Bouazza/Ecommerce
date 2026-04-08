import type { ListOrdersParams } from "../../types";

export const ordersKeys = {
    all: ["orders"] as const,
    list: (params?: ListOrdersParams) =>
        [
            "orders",
            "list",
            params?.status ?? "ALL",
            String(params?.page ?? 1),
            String(params?.per_page ?? 10),
        ] as const,
    details: (id: string | number) => ["orders", "details", String(id)] as const,
};
