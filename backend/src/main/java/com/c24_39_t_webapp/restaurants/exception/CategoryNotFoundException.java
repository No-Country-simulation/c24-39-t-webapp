package com.c24_39_t_webapp.restaurants.exception;

public class CategoryNotFoundException extends NotFoundException {
    public CategoryNotFoundException(String message) {
        super(message);
    }

    @Override
    public String getResourceName() {
        return "Categoria";
    }
}