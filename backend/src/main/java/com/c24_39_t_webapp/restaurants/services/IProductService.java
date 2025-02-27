package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.RestaurantRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;

public interface IProductService {
    ProductResponseDto addProduct(RestaurantRequestDto restaurantRequestDto, String username);
//    List<ProductResponseDto> findAllProducts();
//
//    ProductResponseDto findProductById(Long id);
//
//    ProductResponseDto updateProduct(Long id, RestaurantRequestDto updateDto);
//
//    ProductResponseDto deleteProduct(Long id);

}
