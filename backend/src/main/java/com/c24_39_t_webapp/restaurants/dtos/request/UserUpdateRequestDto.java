package com.c24_39_t_webapp.restaurants.dtos.request;

public record UserUpdateRequestDto(
        String email,
        String password,
        String name,
        String address,
        String phone
) {
}
