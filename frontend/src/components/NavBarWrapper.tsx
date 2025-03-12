"use client";

import { usePathname } from "next/navigation";
import { NavbarBrand, Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import Cart from "@/app/cart/cart";
import { Role } from "@/utils/constants";
import LogoutButton from "@/components/logout-button";
import { Session } from "next-auth";

export default function NavBarWrapper({ session }: { session: Session | null }) {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <>
      {session?.user && (
        <div className={`${!session?.user ? "hidden" : "flex"} md:order-2`}>
          <NavbarBrand>
            <div className={`${!session?.user ? "hidden" : "flex"} md:order-3`}>{session?.user && <Cart />}</div>
          </NavbarBrand>
          <Dropdown arrowIcon={false} inline label={<Avatar alt="Foto de usuario" img="images/user.png" rounded />}>
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
        </div>
      )}
    </>
  );
}
