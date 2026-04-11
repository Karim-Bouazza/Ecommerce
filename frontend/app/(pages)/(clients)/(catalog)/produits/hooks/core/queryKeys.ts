export const clientProductsKeys = {
    all: ["client-products"] as const,
    list: (filters?: {
        categoryId?: number | null;
        minPrice?: number | null;
        maxPrice?: number | null;
    }) =>
        [
            "client-products",
            "list",
            filters?.categoryId ?? "all",
            filters?.minPrice ?? "no-min",
            filters?.maxPrice ?? "no-max",
        ] as const,
    details: (id: string | number) =>
        ["client-products", "details", String(id)] as const,
};

export const clientCategoriesKeys = {
    all: ["client-categories"] as const,
    list: () => ["client-categories", "list"] as const,
};

export const clientOrdersKeys = {
    all: ["client-orders"] as const,
    create: () => ["client-orders", "create"] as const,
};
