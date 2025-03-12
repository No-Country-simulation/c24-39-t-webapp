import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Lobster } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const lobster = Lobster({
  variable: "--lobster",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Foody - Haz tu pedido!",
  description: "Foody es una app para hacer tus pedidos de tus restaurantes favoritos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={` ${lobster.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
