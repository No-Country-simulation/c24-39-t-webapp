package com.c24_39_t_webapp.restaurants.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AuthResponse(
        @JsonProperty("access_token")
        String accessToken,

        @JsonProperty("message")
        String message,

        UserResponseDto user
) {
}
