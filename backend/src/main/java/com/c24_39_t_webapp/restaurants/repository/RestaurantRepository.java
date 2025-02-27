package com.c24_39_t_webapp.restaurants.repository;

import com.c24_39_t_webapp.restaurants.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    // Aquí se pueden agregar métodos de consulta personalizados si es necesario
}