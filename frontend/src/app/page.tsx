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
      <main className="w-full flex flex-col min-h-screen pt-20 bg-yellow-50">
        <span className="text-center text-5xl text-primary font-lobster mt-12">Restaurantes</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 ">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.rst_id}
              className="w-[420px] flex-col justify-center m-auto  bg-amber-700 p-2 rounded-lg shadow-md "
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center w-full m-auto">
          {" "}
          {/* Quitamos max-w-4xl, añadimos px-4 */}
          <span className="text-3xl pt-20 text-primary font-lobster m-auto mb-12">Explora Categorías</span>
          <div className="w-full flex justify-center gap-3 pb-20">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex-none p-4 px-2 py-2 bg-black text-cream text-lg rounded-lg"
                // Aquí puedes agregar una función onClick para filtrar por categorías
              >
                <Image src={category.image} alt={category.name} width={250} height={150} className="rounded-lg h-32" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-primary w-full text-white text-center p-4">
        &copy; 2025 Foody. Todos los derechos reservados.
      </footer>
    </>
  );
}
