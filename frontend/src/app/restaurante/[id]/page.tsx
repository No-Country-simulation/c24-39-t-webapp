import Menu from "@/components/menu";
import { api } from "@/server/service";
import { Product } from "@/utils/types";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

type Props = {
  params: Promise<{
    id: string;
  }>
}

export default async function Page({ params }: Props) {

  const { id } = await params;
  const restaurant = await api.restaurant.get(Number(id));

  // Simulación de productos (cambiar por API real)
  const products: Product[] = [
    {
      prd_id: 1,
      name: "Hamburguesa",
      price: 3500,
      description: "Una hamburguesa",
      restaurantId: Number(id),
      quantity: 100,
      image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg",
      isActive: true,
      categoryId: 1,
    },
    {
      prd_id: 2,
      name: "Pizza",
      price: 4000,
      description: "Una pizza",
      restaurantId: Number(id),
      quantity: 100,
      image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
      isActive: true,
      categoryId: 2,
    },
  ];

  return (
    <main className="min-h-screen w-full md:w-[760px] text-black p-2 md:p-6 mx-auto flex flex-col align-center shadow-lg relative">
      <div>
        <Link
          className="flex gap-1 w-fit items-center justify-center transition-colors hover:bg-gray-200/60 hover:border-black/80 px-2 py-1 text-black decoration-none rounded-full border border-black"
          href="/"
        >
          <HiArrowLeft className="size-3" />
          Volver
        </Link>
      </div>

      {restaurant && (
        <>
          <div className="w-full flex mb-2 justify-center items-center">
            <img
              height="250px"
              className="object-cover w-[50%] md:w-[30%]"
              src={restaurant.logo}
              alt={`Logo de ${restaurant.name}`}
            />
          </div>
          <h1 className="leading-2 text-center text-2xl md:text-5xl font-bold">{restaurant.name}</h1>
          <p className="text-center md:text-2xl text-black/70">{restaurant.description}</p>
        </>
      )}

      {/* Menú (componente Client) */}
      <section className="mt-6">
        <Menu products={products} />
      </section>
    </main>
  );
}
