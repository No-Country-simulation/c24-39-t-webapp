import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import 'tailwindcss';

export default function cartList() {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <Navbar fluid rounded className="justify-between fixed top-0 right-0 left-0">
        <NavbarBrand className="" href="/">
          <span className="self-center text-primary font-lobster whitespace-nowrap text-4xl">Foody</span>
        </NavbarBrand>
        <div className="flex md:order-4">
          <NavbarToggle />
        </div>
        <NavbarCollapse className="text-3xl hover:text-accent font-bold">
          <NavbarLink href="#" active>
            Inicio
          </NavbarLink>
          <NavbarLink href="#">Categorías</NavbarLink>
          <NavbarLink href="#">Restaurantes</NavbarLink>
          <NavbarLink href="#">Contacto</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <main className="flex-grow pt-[4rem] container mx-auto p-6">
        <h2 className="text-3xl text-primary p-10 font-bold text-center mb-6">
          Listar artículos
        </h2>
      </main>
      <footer className="bg-accent w-full text-white text-center p-4 mt-6">
        &copy; 2025 Foody. Todos los derechos reservados.
      </footer>
    </div>
  );
}
