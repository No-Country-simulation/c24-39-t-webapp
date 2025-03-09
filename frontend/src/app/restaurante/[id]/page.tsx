import Menu from "@/components/menu";
import { api } from "@/server/service";

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
    <main className="min-h-screen rounded-lg bg-gray-200 w-full max-w-4xl mx-auto text-black p-4 md:p-6 flex flex-col items-center shadow-lg relative mt-20">
      {restaurant && (
        <>
          <div className="w-full flex mb-4 justify-center">
            <img
              height="250px"
              className="object-cover w-[50%] md:w-[30%] rounded-lg"
              src={restaurant.logo}
              alt={`Logo de ${restaurant.name}`}
            />
          </div>
          <h1 className="text-center text-2xl md:text-5xl font-bold">{restaurant.name}</h1>
          <p className="text-center md:text-2xl text-black/70">{restaurant.description}</p>
        </>
      )}

      {/* Menú */}
      <section className="mt-6  w-full">
        <Menu menu={products} />
      </section>
    </main>
  );
}
