package com.c24_39_t_webapp.restaurants.dtos.response;

public record ProductResponseDto(
        Long prd_id,
        Long restaurant,
        Integer category,
        String name,
        String description,
        Integer price,
        String image,
        Boolean isActive,
        Integer quantity
) {
}
