package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductUpdateDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.services.impl.UserDetailsImpl;

import java.util.List;

public interface IProductService {

    ProductResponseDto addProduct(ProductUpdateDto productUpdateDto, UserDetailsImpl userDetails);
    List<Product> findByName(String name);

    List<Product> findByCategory(Category category);

    List<Product> getAllProducts();

    Product updateProduct(ProductUpdateDto productUpdateDto, Product product, UserDetailsImpl userDetails);

    void deleteProduct(Product product, UserDetailsImpl userDetails);

    List<Product> getAllProductsByRestaurant(Restaurant restaurant);


}
