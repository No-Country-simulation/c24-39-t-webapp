package com.c24_39_t_webapp.restaurants.services;


import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import java.util.List;

public interface IRestaurantService {
    List<RestaurantResponseDto> findAll();
}
