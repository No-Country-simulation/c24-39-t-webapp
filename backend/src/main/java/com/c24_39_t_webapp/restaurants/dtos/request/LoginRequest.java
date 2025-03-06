package com.c24_39_t_webapp.restaurants.dtos.request;

public record LoginRequest(
        Long id,
        String email,
        String password
) {
}
