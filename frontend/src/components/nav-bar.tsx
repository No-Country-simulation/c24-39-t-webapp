import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { auth } from "../../auth";

import NavBarWrapper from "./NavBarWrapper";

export default async function NavBar() {
  const session = await auth();
  return (
    <Navbar fluid rounded className="bg-primary fixed  top-0 w-full z-50">
      <NavbarBrand href="/">
        <span className="self-center text-yellow-50 text-5xl font-lobster font-bold whitespace-nowrap dark:text-white">
          Foody
        </span>
      </NavbarBrand>
      <div className={`${!session?.user ? "flex" : "hidden"} md:order-2`}>
        <Button href="/login" className="bg-element">
          Inicia Sesión
        </Button>
        <NavbarToggle />
      </div>

      <NavBarWrapper session={session} />

      <NavbarCollapse>
        <NavbarLink className="text-white" href="#">
          ¿Qué es foody?
        </NavbarLink>
        <NavbarLink className="text-white " href="#">
          Conviértete en Anfitrión
        </NavbarLink>
        <NavbarLink className="text-white" href="#">
          Ayuda
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
