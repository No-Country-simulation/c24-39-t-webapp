import { Restaurant } from "@/utils/types";
import { Card } from "flowbite-react";
import Image from "next/image";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <Card key={restaurant.rst_id} className="shadow-lg bg-primary">
      <Image
        src={restaurant.logo}
        width={300}
        height={200}
        alt={restaurant.name}
        className="rounded-t-lg  rounded-full"
      />
      <div className="p-4">
        <h2 className="text-xl text-white font-semibold text-center">
          {restaurant.name}
        </h2>
        <p className="text-gray-300 text-center">{restaurant.description}</p>
      </div>
    </Card>
  );
}
