package com.c24_39_t_webapp.restaurants.exception;

public abstract class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public abstract String getResourceName();
}