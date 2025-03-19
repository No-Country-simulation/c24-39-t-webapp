import { Restaurant } from "@/utils/types";
import { Card } from "flowbite-react";
import Image from "next/image";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {

  return (
    <Card
      className="max-w-sm w-60 flex-shrink bg-secondary p-2 dark:bg-gray-800 lg:w-50"
      renderImage={() => <Image width={500} height={500} src={restaurant.logo} alt={restaurant.name} />}
      href={`/restaurante/${restaurant.rst_id}`}
    >
      {/*
      <h6 className="text-lg font-bold tracking-tighter text-cream md:font-base dark:text-white">
      {restaurant.name}
      </h6>
    */}
      <p className="text-xs text-gray-800 tracking-wide dark:text-white lg:text-lg">{restaurant.description}</p>
    </Card>
  );
}
