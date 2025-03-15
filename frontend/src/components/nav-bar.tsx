import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { auth } from "../../auth";

import NavBarWrapper from "./NavBarWrapper";

export default async function NavBar() {
  const session = await auth();
  return (
    <Navbar fluid rounded className="bg-gray-800 fixed top-0 w-full z-50">
      <NavbarBrand href="/">
        <span className="self-center text-logo text-5xl font-lobster font-bold whitespace-nowrap dark:text-white">
          Foody
        </span>
      </NavbarBrand>
      <div className={`${!session?.user ? "flex" : "hidden"} md:order-2`}>
        <Button href="/login" className="bg-primary">
          Inicia Sesión
        </Button>
        <NavbarToggle />
      </div>

      <NavBarWrapper session={session} />

      <NavbarCollapse>
        <NavbarLink href="#" className="text-cream">¿Qué es foody?</NavbarLink>
        <NavbarLink href="#" className="text-cream">Conviértete en Anfitrión</NavbarLink>
        <NavbarLink href="#" className="text-cream">Ayuda</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
