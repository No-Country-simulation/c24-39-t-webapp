import { Product } from "@/utils/types";

type Props = {
    product: Product;
    addToCart: (product: Product) => void;
}

export default function MenuItem({product, addToCart} : Props) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-[10%]"
        />
        <p>
          <span className="text-black/70">{product.description}</span> -{" "}
          <span className="font-semibold text-green-700/90">
            ${product.price}
          </span>
        </p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        Agregar
      </button>
    </div>
  );
}
