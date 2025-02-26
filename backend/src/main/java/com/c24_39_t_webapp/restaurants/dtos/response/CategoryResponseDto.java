package com.c24_39_t_webapp.restaurants.dtos.response;

import com.c24_39_t_webapp.restaurants.models.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class CategoryResponseDto {

    private Long ctg_id;
    private String name;
    private String description;
    // Campos de fecha omitidos

    public CategoryResponseDto(Restaurant restaurant) {
        this.ctg_id = restaurant.getRst_id();
        this.name = restaurant.getName();
        this.description = restaurant.getDescription();
    }
}