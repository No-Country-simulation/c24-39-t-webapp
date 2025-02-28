package com.c24_39_t_webapp.restaurants.dtos.request;

public record UserUpRequestDto(
        String email,
        String password,
        String name,
        String address,
        String phone
) {
}
