package com.c24_39_t_webapp.restaurants.services;


import com.c24_39_t_webapp.restaurants.dtos.request.RestaurantRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.models.Restaurant;

import java.util.List;

public interface IRestaurantService {
    List<RestaurantResponseDto> findAll();

    RestaurantResponseDto findById(Long id);

    RestaurantResponseDto updateRestaurant(Long id, RestaurantRequestDto updateDto);

    void deleteById(Long id);

    Restaurant registerRestaurant(RestaurantRequestDto restaurantRequestDto, String username);
}
