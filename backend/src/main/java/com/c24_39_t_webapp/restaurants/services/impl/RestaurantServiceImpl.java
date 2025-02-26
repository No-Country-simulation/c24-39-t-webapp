package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.services.IRestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RestaurantServiceImpl implements IRestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Override
    public List<RestaurantResponseDto> findAll() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        if (restaurants.isEmpty()) {
            throw new RuntimeException("No se encontraron restaurantes.");
        }

        return restaurants.stream()
                .map(restaurant -> new RestaurantResponseDto(
                        restaurant.getRst_id(),
                        restaurant.getName(),
                        restaurant.getDescription(),
                        restaurant.getPhone(),
                        restaurant.getAddress(),
                        restaurant.getLogo()
                ))
                .collect(Collectors.toList());
    }
}
