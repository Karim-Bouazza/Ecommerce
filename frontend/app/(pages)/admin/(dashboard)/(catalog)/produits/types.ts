export type ProductListItem = {
    id: number;
    title: string;
    quantity: number;
    price: string | number;
    price_after_discount: string | number | null;
    main_photo_url: string | null;
};

export type ProductDetails = {
    id: number;
    title: string;
    description: string;
    quantity: number;
    price: string | number;
    price_after_discount: string | number | null;
    main_photo_url: string | null;
    category: {
        id: number;
        name: string;
    } | null;
    created_at: string;
    updated_at: string;
};

export type ProductPayload = {
    title: string;
    description: string;
    quantity: number;
    price: number;
    price_after_discount?: number | null;
    category_id: number;
    main_photo?: File | null;
    sub_image_01?: File | null;
    sub_image_02?: File | null;
    sub_image_03?: File | null;
};
