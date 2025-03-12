import { URL_BACKEND } from "@/utils/constants"
import { ListOfRestaurants, MenuProduct, OrderRequest, OrderResponse, Restaurant } from "@/utils/types"

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
		getAllByRestaurant: async (id: number): Promise<MenuProduct[]> => {
			try {
				const res = await fetch(`${URL_BACKEND}/api/product/byRestaurantAndCategory/${id}`)
				if (!res.ok) throw new Error(res.statusText)
				const data = await res.json()
				return data
			} catch (error) {
				console.error(`error llamando a los productos del restaurante id:${id}`, error)
				throw error
			}
		}
	},

	order: {
		create: async (orderRequest: OrderRequest, accessToken: string): Promise<OrderResponse> => {
		  try {
			const res = await fetch(`${URL_BACKEND}/orders`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			  },
			  body: JSON.stringify(orderRequest),
			});
			if (!res.ok) {
			  const errorData = await res.json();
			  throw new Error(`Error ${res.status}: ${errorData.message || "Error al crear el pedido"}`);
			}
			const data = await res.json();
			return data; // Ahora devuelve el OrderResponse completo
		  } catch (error) {
			console.error("Error creando el pedido:", error);
			throw error;
		  }
		},
	  },
	};