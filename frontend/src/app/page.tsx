import {
  Card,
  Avatar,
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
import Image from "next/image";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();

  const categories = [
    { id: 1, name: "Italiana", image: "/images/italiana.jpg" },
    { id: 2, name: "Japonesa", image: "/images/japonesa.jpg" },
    { id: 3, name: "Mexicana", image: "/images/mexicana.jpg" },
    { id: 4, name: "Vegetariana", image: "/images/vegetariana.jpg" },
    { id: 5, name: "Fast Food", image: "/images/fastfood.jpg" },
  ];

  const restaurants = [
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

  {
    session?.access_token ?? "no autenticado";
  }
  return (
    <div className="bg-gray-300">
      <Navbar fluid rounded className=" text-white bg-slate-500 w-full">
        <NavbarBrand className="bg-slate-400" href="/">
          <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Foody Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">Foody</span>
        </NavbarBrand>
        <div className="flex bg-slate-700 md:order-2">
          <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="/images/user.jpg" rounded />}>
            <DropdownHeader>
              <span className="block text-sm">Usuario</span>
              <span className="block truncate text-sm font-medium">user@example.com</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse className="bg-slate-500">
          <NavbarLink href="#" active>
            Inicio
          </NavbarLink>
          <NavbarLink href="#">Categorías</NavbarLink>
          <NavbarLink href="#">Restaurantes</NavbarLink>
          <NavbarLink href="#">Contacto</NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <main className="container mx-auto p-6">
        <h1 className="text-3xl text-primary p-10 font-bold text-center mb-6">Explora Categorías</h1>
        <div className="flex flex-wrap justify-center gap-4 p-10">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-20 py-10 bg-secondary text-primary text-lg rounded-lg hover:bg-primary hover:text-secondary transition"
              // aca colocar una funcion en onclick para el filtrado por categorias
            >
              {category.name}
            </button>
          ))}
        </div>

        <h1 className="text-3xl text-primary font-bold text-center my-6">Restaurantes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="shadow-lg bg-primary text-gray-900">
              <Image
                src={restaurant.image}
                width={300}
                height={200}
                alt={restaurant.name}
                className="rounded-t-lg  rounded-full"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{restaurant.name}</h2>
                <p className="text-gray-600 text-center">{restaurant.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-accent w-full text-white text-center p-4 mt-6">
        &copy; 2025 Foody. Todos los derechos reservados.
      </footer>
    </div>
  );
}
