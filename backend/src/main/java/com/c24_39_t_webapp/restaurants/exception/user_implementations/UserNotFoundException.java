package com.c24_39_t_webapp.restaurants.exception.user_implementations;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
