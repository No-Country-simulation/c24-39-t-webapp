package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.exception.RestaurantNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.services.IRestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
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

    @Override
    public RestaurantResponseDto findById(Long id) {
        log.info("Buscando restaurante con ID: {}", id);
//        Restaurant restaurant = restaurantRepository.findById(id)
        if (id == null || id <= 0) {
            log.warn("El ID del restaurante proporcionado es invalido: {}", id);
            throw new RestaurantNotFoundException("El ID del restaurante no es válido " + id);
        }
        return restaurantRepository.findById(id)
                .map(restaurant -> new RestaurantResponseDto(
                        restaurant.getRst_id(),
                        restaurant.getName(),
                        restaurant.getDescription(),
                        restaurant.getPhone(),
                        restaurant.getAddress(),
                        restaurant.getLogo()
                ))
                .orElseThrow(() -> {
                    log.warn("No se encontro un gasto con el ID: {}", id);
                    return new RestaurantNotFoundException("No se encontro un restaurante con ese ID: " + id);
                });
    }
}
