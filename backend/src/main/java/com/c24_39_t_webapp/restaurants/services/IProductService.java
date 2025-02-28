package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;

public interface IProductService {
    ProductResponseDto addProduct(ProductRequestDto productRequestDto, String username, Long restaurantId);
//    List<ProductResponseDto> findAllProducts();
//
//    ProductResponseDto findProductById(Long id);
//
//    ProductResponseDto updateProduct(Long id, RestaurantRequestDto updateDto);
//
//    ProductResponseDto deleteProduct(Long id);

}
