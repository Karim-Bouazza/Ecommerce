export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPID"
    | "OUT_FOR_DELIVERY"
    | "FAILED"
    | "RETURNED"
    | "DELIVERED";

export type OrderListItem = {
    id: number;
    nom: string;
    prenom: string;
    numero_telephone: string;
    status: OrderStatus | string;
};

export type OrdersListResponse = {
    data: OrderListItem[];
};

export type ListOrdersParams = {
    status?: OrderStatus;
    page?: number;
    per_page?: number;
};

export type OrderDetailsItem = {
    id: number;
    product_id: number;
    product_title: string | null;
    quantity: number;
    unit_price: string | number;
    total_price: string | number;
};

export type OrderDetails = {
    id: number;
    nom: string;
    prenom: string;
    wilaya: string;
    baladia: string;
    numero_telephone: string;
    total_price: string | number;
    status: OrderStatus | string;
    items: OrderDetailsItem[];
    created_at: string;
    updated_at: string;
};

export type OrderDetailsResponse = {
    data: OrderDetails;
};
