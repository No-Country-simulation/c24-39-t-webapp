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
import 'tailwindcss';
import { auth } from "../../auth";
import LogoutButton from "@/components/logout-button";
import { Role } from "@/utils/constants";
import Image from "next/image";
import Cart from "@/app/cart/cart";

/////////>>>>>
import RestaurantCard from "@/components/restaurant-card"; // COMPONENTE AGREGADO PARA HACER FUNCIONAR LA PÁGINA
import { api } from "@/server/service"; // API AGREGADA PARA HACER FUNCIONAR LA PÁGINA
import { Chocolate_Classical_Sans } from "next/font/google";
/////////>>>>>

//import Head from "next/head";

export default async function Home() {

  const session = await auth();
  const restaurants = await api.restaurant.all()

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
      <Navbar fluid rounded className="bg-cream">
        <NavbarBrand href="/">
          <span className="self-center text-logo text-5xl font-lobster font-bold whitespace-nowrap dark:text-white">Foody</span>
        </NavbarBrand>
        <div className={`${!session?.user ? 'flex' : 'hidden'} md:order-2`}>
          <Button href="/login" className="bg-element">Inicia Sesión</Button>
          <NavbarToggle />
        </div>
        <div className={`${!session?.user ? 'hidden' : 'flex'} md:order-2`}>
          <NavbarBrand>
            <div className={`${!session?.user ? 'hidden' : 'flex'} md:order-3`}>
              {session?.user && <Cart />}
            </div>
          </NavbarBrand>
          {
            session?.user && (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="Foto de usuario" img="images/user.png" rounded />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">{session?.user?.name}</span>
                  <span className="block truncate text-sm font-medium">{session?.user?.role}</span>
                </DropdownHeader>
                {
                  session?.user?.role === Role.Restaurant ?
                    (<DropdownItem href="/dashboard">Panel de administración</DropdownItem>) :
                    <DropdownItem href="/perfil">Perfil</DropdownItem>
                }
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Configuración</DropdownItem>
                <DropdownDivider />
                <DropdownItem as={LogoutButton}>Cerrar Sesión</DropdownItem>
              </Dropdown>
            )
          }
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#">¿Qué es foody?</NavbarLink>
          <NavbarLink href="#">Conviértete en Anfitrión</NavbarLink>
          <NavbarLink href="#">Ayuda</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <main className="w-full flex flex-col min-h-screen bg-gradient-to-r from-orange-900 via-orange-600 to-orange-500">
        <span className="text-3xl text-cream z-10 font-lobster text-center mt-10 mb-3">Restaurantes</span>
        <div className="overflow-x-auto">
          <div className="flex gap-3">
            {restaurants.map((restaurant) => (
              <div key={restaurant.rst_id} className="flex-none w-64 bg-cream p-2 border rounded-lg shadow-md">
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
        <span className="text-3xl text-cream mt-10 font-lobster text-center mb-3">Explora Categorías</span>
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex-none p-4 px-2 py-2 bg-black text-cream text-lg rounded-lg"
              // aca colocar una funcion en onclick para el filtrado por categorias
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
