package com.c24_39_t_webapp.restaurants.dtos.request;

import com.c24_39_t_webapp.restaurants.models.OrderState;

public record OrderUpdateRequestDto(
        OrderState estate,
        String comments
) {}