import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Lobster, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import { CartProvider } from "@/context/CartContext";
import "tailwindcss";


const lobster = Lobster({
  variable: "--lobster",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foody - Haz tu pedido!",
  description: "Foody es una app para hacer tus pedidos de tus restaurantes favoritos!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicon.png" />
      <ThemeModeScript />
      </head>
      <body className={`${lobster.variable} antialiased`}>
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
