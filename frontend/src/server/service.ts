import { URL_BACKEND } from "@/utils/constants"
import { ListOfRestaurants, Product, Restaurant } from "@/utils/types"

export const api = {
	restaurant: {
		all: async (): Promise<ListOfRestaurants> => {
			try {
				const res = await fetch(`${URL_BACKEND}/api/restaurant/all`)
				if (!res.ok) throw new Error(res.statusText)
				const data = await res.json()
				return data
			} catch (error) {
				console.error("error llamando a todos los restaurantes", error)
				throw error
			}
		},
		get: async (id: number): Promise<Restaurant> => {
			try {
				const res = await fetch(`${URL_BACKEND}/api/restaurant/${id}`)
				if (!res.ok) throw new Error(res.statusText)
				const data = await res.json()
				return data
			} catch (error) {
				console.error(`error llamand al restaurante id:${id}`, error)
				throw error
			}
		}
	},

	product: {
		getAllByRestaurant: async (id: number): Promise<Product[]> => {
			try {
				const res = await fetch(`${URL_BACKEND}/api/product/byRestaurant/${id}`)
				if (!res.ok) throw new Error(res.statusText)
				const data = await res.json()
				return data
			} catch (error) {
				console.error(`error llamando a los productos del restaurante id:${id}`, error)
				throw error
			}
		}
	}
}
