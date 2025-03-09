import {
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
import LogoutButton from "@/components/logout-button";
import { Role } from "@/utils/constants";
import Cart from "@/app/cart/cart";
import { auth } from "../../auth";

export default async function NavBar() {
  const session = await auth();

  return (
    <Navbar fluid rounded className="justify-between fixed top-0 right-0 left-0">
      <NavbarBrand className="" href="/">
        <span className="self-center text-primary font-lobster whitespace-nowrap text-4xl">Foody</span>
      </NavbarBrand>
      <Cart />
      <div className="flex md:order-2">
        {session?.user && (
          <Dropdown
            arrowIcon={false}
            className="hidden md:block"
            inline
            label={<Avatar alt="User settings" img="/user.png" rounded />}
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
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem as={LogoutButton}>Cerrar sesión</DropdownItem>
          </Dropdown>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse className="text-3xl hover:text-accent z-10 font-bold">
        <NavbarLink href="#" active>
          Inicio
        </NavbarLink>
        <NavbarLink href="#">Categorías</NavbarLink>
        <NavbarLink href="#">Restaurantes</NavbarLink>
        <NavbarLink href="#">Contacto</NavbarLink>
        {session?.user?.role === Role.Restaurant ? (
          <NavbarLink className="block md:hidden" href="/dashboard">
            Panel de administración
          </NavbarLink>
        ) : (
          <NavbarLink className="block md:hidden" href="/perfil">
            Perfil
          </NavbarLink>
        )}
        {session?.user && (
          <span className="block md:hidden">
            <LogoutButton />
          </span>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
