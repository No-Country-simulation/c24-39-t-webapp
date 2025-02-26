package com.c24_39_t_webapp.restaurants.dtos.response;

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
}