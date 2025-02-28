package com.c24_39_t_webapp.restaurants.dtos.response;

import jakarta.persistence.Column;

public record UserResponseDto(
        Long id,

        String name,

        String email,

        String role,

        String phone,

        String address
) {
}
