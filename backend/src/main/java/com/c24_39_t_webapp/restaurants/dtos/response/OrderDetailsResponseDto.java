package com.c24_39_t_webapp.restaurants.dtos.response;

public record OrderDetailsResponseDto(
    Long odt_id,
    Long productId,
    Integer quantity,
    Double subtotal
    ) {}