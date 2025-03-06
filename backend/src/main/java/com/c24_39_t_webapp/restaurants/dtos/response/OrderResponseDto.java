package com.c24_39_t_webapp.restaurants.dtos.response;

import com.c24_39_t_webapp.restaurants.models.OrderState;

import java.util.List;

public record OrderResponseDto(
    Long ord_Id,
    Long clientId,
    Long restaurantId,
    OrderState estate,
    Double total,
    String comments,
    List<OrderDetailsResponseDto> details
) {
}
