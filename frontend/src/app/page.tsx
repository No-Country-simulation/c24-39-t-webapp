import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import "tailwindcss";
import { auth } from "../../auth";
import LogoutButton from "@/components/logout-button";
import { Role } from "@/utils/constants";
import Image from "next/image";
import Cart from "@/app/cart/cart";

/////////>>>>>
import RestaurantCard from "@/components/restaurant-card"; // COMPONENTE AGREGADO PARA HACER FUNCIONAR LA PÁGINA
import { api } from "@/server/service"; // API AGREGADA PARA HACER FUNCIONAR LA PÁGINA
// import { Chocolate_Classical_Sans } from "next/font/google";
/////////>>>>>

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

  /*const restaurants = [
    {
      id: 1,
      name: "Pasta Bella",
      category: "Italiana",
      image:
        "https://ixbnnrlngacirjuxztxa.supabase.co/storage/v1/object/public/fotos-c24-39-t-webapp/imagenes-logos/Pizzeria_Italiana_logo.webp",
    },
    {
      id: 2,
      name: "Sushi World",
      category: "Japonesa",
      image:
        "https://ixbnnrlngacirjuxztxa.supabase.co/storage/v1/object/public/fotos-c24-39-t-webapp/imagenes-logos/Sushi_Samurai_logo.webp",
    },
    {
      id: 3,
      name: "Taco Loco",
      category: "Mexicana",
      image:
        "https://ixbnnrlngacirjuxztxa.supabase.co/storage/v1/object/public/fotos-c24-39-t-webapp/imagenes-logos/Sabor_Mexicano_logo.webp",
    },
    {
      id: 4,
      name: "Green Bites",
      category: "Vegetariana",
      image:
        "https://ixbnnrlngacirjuxztxa.supabase.co/storage/v1/object/public/fotos-c24-39-t-webapp/imagenes-logos/Delicias_Veganas_logo.webp",
    },
    {
      id: 5,
      name: "Burger House",
      category: "Fast Food",
      image:
        "https://ixbnnrlngacirjuxztxa.supabase.co/storage/v1/object/public/fotos-c24-39-t-webapp/imagenes-logos/Hamburgueseria_El_Sabor_logo.webp",
    },
  ];

  */

  return (
    <>
      <main className="w-full flex flex-col min-h-screen pt-20 bg-gradient-to-r from-orange-900 via-orange-700 to-orange-600">
        <span className="text-center text-3xl text-cream font-lobster mt-12">Restaurantes</span>
        <div className="justify-center overflow-x-auto flex gap-3 mt-12">
          {restaurants.map((restaurant) => (
            <div key={restaurant.rst_id} className="flex-none w-sm bg-cream p-2 rounded-lg shadow-md">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center w-full m-auto"> {/* Quitamos max-w-4xl, añadimos px-4 */}
        <span className="text-3xl text-cream font-lobster mb-3 m-auto mb-12">
          Explora Categorías
        </span>
        <div className="w-full flex justify-center gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex-none p-4 px-2 py-2 bg-black text-cream text-lg rounded-lg"
              // Aquí puedes agregar una función onClick para filtrar por categorías
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={250}
                  height={150}
                  className="rounded-lg h-32"
                />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-cream w-full text-black text-center p-4">
        &copy; 2025 Foody. Todos los derechos reservados.
      </footer>
    </>
  );
}
