package com.c24_39_t_webapp.restaurants.dtos.response;

import com.c24_39_t_webapp.restaurants.models.Restaurant;

public record RestaurantResponseDto(
        Long rst_id,
        String name,
        String description,
        String phone,
        String address,
        String logo
) {
    public RestaurantResponseDto(Restaurant restaurant) {
        this(
                restaurant.getRst_id(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getPhone(),
                restaurant.getAddress(),
                restaurant.getLogo()
        );
    }
}