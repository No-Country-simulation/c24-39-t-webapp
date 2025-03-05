package com.c24_39_t_webapp.restaurants.repository;

import com.c24_39_t_webapp.restaurants.models.Order;
import com.c24_39_t_webapp.restaurants.models.OrderState;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByRestaurantId(Restaurant restaurant);
    List<Order> findByRestaurantIdAndCreatedAtBetween(Restaurant restaurant, LocalDateTime start, LocalDateTime end);
    List<Order> findByClientId_Id(Long clientId);
    List<Order> findByClientId_IdAndCreatedAtBetween(Long clientId, LocalDateTime start, LocalDateTime end);
    List<Order> findByStateAndRestaurantId_Id(OrderState state, Long restaurantId);
}
