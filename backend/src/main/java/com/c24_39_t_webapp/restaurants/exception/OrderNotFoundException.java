package com.c24_39_t_webapp.restaurants.exception;

public class OrderNotFoundException extends NotFoundException {

        public OrderNotFoundException(String message) {
            super(message);
        }

        @Override
        public String getResourceName() {
            return "Pedido";
        }
    }