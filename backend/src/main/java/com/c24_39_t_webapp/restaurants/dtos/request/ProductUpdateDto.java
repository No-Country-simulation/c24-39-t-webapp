package com.c24_39_t_webapp.restaurants.dtos.request;

import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Restaurant;

public record ProductUpdateDto(
        Restaurant restaurant,
        Category category,
        String name,
        String description,
        Double price,
        String image,
        Boolean isActive,
        Integer quantity

) {
}
