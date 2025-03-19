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
      <main className="flex flex-grow flex-col w-full bg-white">
        <span className="text-start text-xl text-gray-900 ml-4 mr-4 mt-24 md:mt-28 md:ml-4 md:text-xl lg:ml-24">
          Estos son los restaurantes que te están esperando
        </span>
        <div className="flex flex-row overflow-x-auto gap-4 pl-4 pr-4 pt-2 pb-6 border-b lg:ml-20 lg:mr-18 lg:flex-wrap lg:content-start">
          {restaurants.map((restaurant) => (
            <div key={restaurant.rst_id} className="flex">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        <span className="text-start text-xl text-gray-900 pt-6 ml-4 mr-4 lg:ml-24">
          Explora por categorías
        </span>
        <div className="flex flex-wrap gap-4 content-start justify-between ml-4 p-2 lg:ml-20 lg:mr-20">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center"
            // Aquí puedes agregar una función onClick para filtrar por categorías
            >
              <div className="w-40 h-52 flex relative rounded lg:w-70">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <span className="text-center text-gray-800 lg:text-lg">{category.name}</span>
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
