import { Restaurant } from "@/utils/types";
import { Card } from "flowbite-react";
import Image from "next/image";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {

  return (
    <Card
      className="max-w-sm bg-primary hover:bg-gray-800 p-0"
      horizontal={true}
      renderImage={() => <Image width={300} height={300} src={restaurant.logo} alt={restaurant.name} />}
      href={`/restaurante/${restaurant.rst_id}`}
    >
      {/*
      <h6 className="text-lg font-bold tracking-tighter text-cream md:font-base dark:text-white">
      {restaurant.name}
      </h6>
    */}
      <p className="text-base tracking-tighter text-cream dark:text-white">{restaurant.description}</p>
    </Card>
  );
}
