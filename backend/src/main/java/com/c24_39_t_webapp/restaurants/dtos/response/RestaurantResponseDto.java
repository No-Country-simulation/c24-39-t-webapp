package com.c24_39_t_webapp.restaurants.dtos.response;

import com.c24_39_t_webapp.restaurants.models.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RestaurantResponseDto {

    private Long rst_id;
    private String name;
    private String description;
    private String phone;
    private String address;
    private String logo;
    // Campos de fecha omitidos

    public RestaurantResponseDto(Restaurant restaurant) {
        this.rst_id = restaurant.getRst_id();
        this.name = restaurant.getName();
        this.description = restaurant.getDescription();
        this.phone = restaurant.getPhone();
        this.address = restaurant.getAddress();
        this.logo = restaurant.getLogo();
    }
}