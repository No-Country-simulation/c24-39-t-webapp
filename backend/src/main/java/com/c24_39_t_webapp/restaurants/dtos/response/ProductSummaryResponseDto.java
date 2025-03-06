package com.c24_39_t_webapp.restaurants.dtos.response;

public record ProductSummaryResponseDto(
    Long prd_id,
    Long restaurantId,
    Long categoryId,
    String name,
    String description,
    String image
) {
    }
