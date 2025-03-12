// app/cart/page.tsx
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
import { auth } from "../../../auth";
import LogoutButton from "@/components/logout-button";
import { Role } from "@/utils/constants";
import Cart from "@/app/cart/cart";
import CartList from "@/components/cart-list";

export default async function CartPage() {
  const session = await auth(); // Obtener la sesión del usuario
  console.log("SESSION:", session);

  return (
    <>
      <Navbar fluid rounded className="bg-cream">
        <NavbarBrand href="/">
          <span className="self-center text-logo text-5xl font-lobster font-bold whitespace-nowrap dark:text-white">
            Foody
          </span>
        </NavbarBrand>
        <div className={`${!session?.user ? "flex" : "hidden"} md:order-2`}>
          <Button href="/login" className="bg-element">
            Inicia Sesión
          </Button>
          <NavbarToggle />
        </div>
        <div className={`${!session?.user ? "hidden" : "flex"} md:order-2`}>
          <NavbarBrand>
            <div className={`${!session?.user ? "hidden" : "flex"} md:order-3`}>
              {session?.user && <Cart />}
            </div>
          </NavbarBrand>
          {session?.user && (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="Foto de usuario" img="/images/user.png" rounded />}
            >
              <DropdownHeader>
                <span className="block text-sm">{session?.user?.name}</span>
                <span className="block truncate text-sm font-medium">{session?.user?.role}</span>
              </DropdownHeader>
              {session?.user?.role === Role.Restaurant ? (
                <DropdownItem href="/dashboard">Panel de administración</DropdownItem>
              ) : (
                <DropdownItem href="/perfil">Perfil</DropdownItem>
              )}
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Configuración</DropdownItem>
              <DropdownDivider />
              <DropdownItem as={LogoutButton}>Cerrar Sesión</DropdownItem>
            </Dropdown>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="/">Inicio</NavbarLink>
          <NavbarLink href="#">¿Qué es foody?</NavbarLink>
          <NavbarLink href="#">Conviértete en Anfitrión</NavbarLink>
          <NavbarLink href="#">Ayuda</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <main className="w-full flex flex-col min-h-screen pt-20 bg-gradient-to-r from-orange-900 via-orange-700 to-orange-600">
        {/* <h2 className="text-3xl text-cream z-10 font-lobster text-center mt-10 mb-3">
          Lista de artículos
        </h2> */}
        <CartList session={session}/>
      </main>
      <footer className="bg-cream w-full text-black text-center p-4">
        © 2025 Foody. Todos los derechos reservados.
      </footer>
    </>
  );
}