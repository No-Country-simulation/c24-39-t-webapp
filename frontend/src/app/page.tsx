import "tailwindcss";
import Image from "next/image";
import RestaurantCard from "@/components/restaurant-card"; // COMPONENTE AGREGADO PARA HACER FUNCIONAR LA PÁGINA
import { api } from "@/server/service"; // API AGREGADA PARA HACER FUNCIONAR LA PÁGINA

//import Head from "next/head";

export default async function Home() {
  const restaurants = await api.restaurant.all();

  const categories = [
    { id: 1, name: "Italiana", image: "/images/italiana.jpg" },
    { id: 2, name: "Japonesa", image: "/images/japonesa.jpg" },
    { id: 3, name: "Mexicana", image: "/images/mexicana.jpg" },
    { id: 4, name: "Vegana", image: "/images/vegana.jpg" },
    { id: 5, name: "Fast Food", image: "/images/fastfood.jpg" },
    { id: 6, name: "Panadería", image: "/images/panaderia.jpg" },
  ];

  return (
    <>
      <main className="w-full flex flex-col min-h-screen bg-secondary">
        <span className="text-start text-xl text-gray-900 ml-4 mr-4 mt-24 md:mt-28 md:ml-4 md:text-2xl lg:ml-24">
          Restaurantes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-4 pr-4 pt-2 pb-6 border-b lg:ml-20 lg:mr-20">
          {restaurants.map((restaurant) => (
            <div key={restaurant.rst_id} className="shrinky-0 lg:w-full">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        <span className="text-start text-xl text-gray-900 pt-6 ml-4 mr-4 md:mr-20 md:text-xl lg:ml-24">
          Explora Categorías
        </span>
        <div className="flex justify-center items-center p-4 flex-wrap gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center"
            // Aquí puedes agregar una función onClick para filtrar por categorías
            >
              <div className="w-40 h-32 flex justify-center items-center overflow-hidden relative rounded">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <span className="text-center text-gray-800 mt-2">{category.name}</span>
            </button>
          ))}
        </div>
      </main>
      <footer className="bg-secondary w-full text-gray-800 border-t text-center p-4 text-xs">
        &copy; 2025 Foody. Todos los derechos reservados.
      </footer>
    </>
  );
}
