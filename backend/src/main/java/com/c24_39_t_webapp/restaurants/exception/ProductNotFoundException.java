package com.c24_39_t_webapp.restaurants.exception;

public class ProductNotFoundException extends NotFoundException {
    public ProductNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getResourceName() {
        return "Producto";
    }
}
