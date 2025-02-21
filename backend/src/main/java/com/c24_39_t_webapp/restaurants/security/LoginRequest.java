package com.c24_39_t_webapp.restaurants.security;

public record LoginRequest(
        String email,
        String password
) {
}
