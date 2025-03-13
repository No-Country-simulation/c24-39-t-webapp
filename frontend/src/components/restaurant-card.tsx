import { Restaurant } from "@/utils/types";
import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card
      key={restaurant.rst_id}
      className="shadow-lg h-[450px] bg-element hover:bg-primary transition-colors flex flex-col items-center"
    >
      <Link href={`/restaurante/${restaurant.rst_id}`} className="flex flex-col items-center">
        <Image
          src={restaurant.logo}
          width={250}
          height={250}
          alt={restaurant.name}
          className="rounded-t-lg rounded-full"
        />
        <div className="p-3 text-center">
          <h2 className="text-pretty text-xl text-white font-semibold">{restaurant.name}</h2>
          <p className="text-gray-300 text-sm">{restaurant.description}</p>
        </div>
      </Link>
    </Card>
  );
}
