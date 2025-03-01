package com.c24_39_t_webapp.restaurants.dtos.response;

import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDto {
    Restaurant restaurant;
    Category category;
    String name;
    String description;
    Double price;
    String image;
    Boolean isActive;
    Integer quantity;

    public ProductResponseDto(Product product) {
        this.restaurant = product.getRestaurant();
        this.category = product.getCategory();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.image = product.getImage();
        this.isActive = product.getIsActive();
        this.quantity = product.getQuantity();
    }
}
