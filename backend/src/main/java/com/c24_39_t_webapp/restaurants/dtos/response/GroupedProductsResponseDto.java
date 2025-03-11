package com.c24_39_t_webapp.restaurants.dtos.response;

import java.util.List;

public record GroupedProductsResponseDto(
        String categoryName, // Nombre de la categoría
        Long categoryId,     // ID de la categoría
        String restaurantName, // Nombre del restaurante
        Long restaurantId,    // ID del restaurante
        List<ProductResponseDto> products // Lista de productos
) {}