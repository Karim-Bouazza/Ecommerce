export const categoriesKeys = {
    all: ["categories"] as const,
    list: () => ["categories"] as const,
    details: (id: string | number) =>
        ["categories", "details", String(id)] as const,
};
