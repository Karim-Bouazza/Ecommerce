export const clientProductsKeys = {
    all: ["client-products"] as const,
    list: () => ["client-products", "list"] as const,
    details: (id: string | number) =>
        ["client-products", "details", String(id)] as const,
};

export const clientOrdersKeys = {
    all: ["client-orders"] as const,
    create: () => ["client-orders", "create"] as const,
};
