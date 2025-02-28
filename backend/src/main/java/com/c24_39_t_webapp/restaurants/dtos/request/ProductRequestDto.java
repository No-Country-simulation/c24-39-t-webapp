package com.c24_39_t_webapp.restaurants.dtos.request;

import jakarta.validation.constraints.NotBlank;

public record ProductRequestDto(
        @NotBlank(message = "El ID del restaurante no puede estar vacío.")
        Long restaurantId,

        @NotBlank(message = "La categoria del producto no puede estar vacío.")
        Long categoryId,
        @NotBlank(message = "El nombre del producto no puede estar vacío.")
        String name,

        @NotBlank(message = "La descripción no puede estar vacía.")
        String description,

        @NotBlank(message = "El precio no puede estar vacío.")
        Integer price,

        @NotBlank(message = "La imagen no puede estar vacía.")
        String image,

        @NotBlank(message = "El estado no puede estar vacío.")
        Boolean isActive,

        @NotBlank(message = "La cantidad no puede estar vacío.")
        Integer quantity
) {
}
