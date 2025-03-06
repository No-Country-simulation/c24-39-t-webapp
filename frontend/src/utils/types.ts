export type ListOfRestaurants = Restaurant[]

export interface Restaurant {
    "rst_id": number
    name: string
    description: string
    logo: string
    phone: string
    address: string
}