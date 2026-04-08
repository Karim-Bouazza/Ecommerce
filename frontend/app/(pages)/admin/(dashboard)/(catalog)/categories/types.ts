export type CategoryListItem = {
    id: number;
    name: string;
};

export type CategoryDetails = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type CategoryPayload = {
    name: string;
};
