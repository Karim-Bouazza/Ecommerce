export type ClientProductListItem = {
    id: number;
    title: string;
    price: string | number;
    price_after_discount: string | number | null;
    main_photo_url: string | null;
};

export type ClientProductsResponse = {
    data: ClientProductListItem[];
};

export type ClientProductDetails = {
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

export type ClientProductDetailsResponse = {
    data: ClientProductDetails;
};

export type ClientOrderFormValues = {
    nom: string;
    prenom: string;
    wilaya: string;
    baladia: string;
    numero_telephone: string;
    quantity: number;
};

export type ClientOrderItemPayload = {
    product_id: number;
    quantity: number;
};

export type ClientCreateOrderPayload = {
    nom: string;
    prenom: string;
    wilaya: string;
    baladia: string;
    numero_telephone: string;
    items: ClientOrderItemPayload[];
};

export type ClientOrderItem = {
    id: number;
    product_id: number;
    product_title: string;
    quantity: number;
    unit_price: string | number;
    total_price: string | number;
};

export type ClientOrder = {
    id: number;
    nom: string;
    prenom: string;
    wilaya: string;
    baladia: string;
    numero_telephone: string;
    total_price: string | number;
    status: string;
    items: ClientOrderItem[];
    created_at: string;
    updated_at: string;
};

export type ClientCreateOrderResponse = {
    data: ClientOrder;
};
