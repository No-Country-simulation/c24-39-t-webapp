import Menu from "@/components/menu";
import { api } from "@/server/service";

import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Hago la llamada en paralelo para que sea más rápido
  const [restaurant, products] = await Promise.all([
    api.restaurant.get(Number(id)),
    api.product.getAllByRestaurant(Number(id)),
  ]);

  return (
    <main className="min-h-screen w-full md:w-[760px] text-black pt-16 mx-auto flex flex-col align-center shadow-lg relative">
      {restaurant && (
        <>
          <div>
            <Image
              src={restaurant.logo}
              alt={`Logo de ${restaurant.name}`}
              width={300}
              height={300}
            />
          </div>
          <h1 className="leading-2 text-center pt-4 text-2xl md:text-5xl font-bold">{restaurant.name}</h1>
          <p className="text-center md:text-2xl text-black/70">{restaurant.description}</p>
        </>
      )}

      {/* Menú (componente Client) */}
      <section className="mt-6">
        <Menu menu={products} />
      </section>
    </main>
  );
}
