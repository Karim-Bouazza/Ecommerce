export const productsKeys = {
    all: ["products"] as const,
    list: () => ["products"] as const,
    details: (id: string | number) =>
        ["products", "details", String(id)] as const,
};
