package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductUpdateDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.services.impl.UserDetailsImpl;

import java.util.List;

public interface IProductService {

    ProductResponseDto addProduct(ProductUpdateDto productUpdateDto, UserDetailsImpl userDetails);
    List<ProductResponseDto> findByName(String name);

    List<ProductResponseDto> findByCategory(Category category);

    List<ProductResponseDto> getAllProducts();

    ProductResponseDto updateProduct(ProductUpdateDto productUpdateDto, Product product, UserDetailsImpl userDetails);

    void deleteProduct(Product product, UserDetailsImpl userDetails);

    List<ProductResponseDto> getAllProductsByRestaurant(Restaurant restaurant);


}
