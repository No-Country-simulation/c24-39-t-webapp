package com.c24_39_t_webapp.restaurants.exception;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(String id) {
        super("Usuario con ID " + id + " no encontrado");
    }

    @Override
    public String getResourceName() {
        return "Usuario";
    }
}