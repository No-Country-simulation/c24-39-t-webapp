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
