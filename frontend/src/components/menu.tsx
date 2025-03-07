"use client"

import { Product } from "@/utils/types"
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react"


export default function Menu({products = []}: {products: Product[]}) {
   console.log(products)

    return (
        <Accordion className="focus:ring-red-300">
            {products.map((product) => (
                <AccordionPanel key={product.prd_id}>
                    <AccordionTitle>
                        <div className="flex gap-6 items-center justify-between">
                            <h3 className="text-lg">{product.name}</h3>
                            <span className="font-bold">${product.price}</span>
                        </div>
                    </AccordionTitle>
                    <AccordionContent>
                        <div className="flex gap-2 items-center">
                            <img src={product.image} alt={product.name} className="object-cover w-[10%]" />
                            <p>{product.description}</p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            ))}
        </Accordion>
    )
}
