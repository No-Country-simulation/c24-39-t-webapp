export type ListOfRestaurants = Restaurant[]

export interface Restaurant {
    "rst_id": number
    name: string
    description: string
    logo: string
    phone: string
    address: string
}

export type Product = {
    "prd_id": number
    restaurantId: number
    categoryId: number
    name: string
    description: string
    price: number
    image: string
    isActive: boolean
    quantity: number
}

export type MenuProduct = {
    categoryName: string
    categoryId: number
    restaurantName: string
    restaurantId: number
    products: Product[]
}

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

// Tipo para la solicitud de pedido
export type OrderRequest = {
    restaurantId: number;
    clientId: string | number; // Según tu CustomUser, puede ser string o number
    total: number;
    comments: string;
    details: {
        productId: number;
        quantity: number;
        subtotal: number;
    }[];
};
// Tipo para los detalles de la respuesta
export type OrderDetailsResponse = {
    odt_id: number;
    productId: number;
    quantity: number;
    subtotal: number;
};
// Tipo para la respuesta del pedido
export type OrderResponse = {
    ord_id: number;
    clientId: string | number;
    restaurantId: number;
    state: string; // "pendiente" u otros valores de OrderState
    total: number;
    comments: string;
    details: OrderDetailsResponse[];
};