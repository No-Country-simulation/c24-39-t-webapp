import { Restaurant } from "@/utils/types";
import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <Card key={restaurant.rst_id} className="shadow-lg bg-primary hover:bg-primary/80 transition-colors">
      <Link className="" href={`/restaurante/${restaurant.rst_id}`}>
      <Image
        src={restaurant.logo}
        width={300}
        height={200}
        alt={restaurant.name}
        className="rounded-t-lg  rounded-full"
      />
      <div className="p-3">
        <h2 className="text-pretty text-xl text-white font-semibold text-center">
          {restaurant.name}
        </h2>
        <p className="text-gray-300 text-sm text-center text-balance">{restaurant.description}</p>
      </div>
      </Link>
    </Card>
  );
}
