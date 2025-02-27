package com.c24_39_t_webapp.restaurants.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.c24_39_t_webapp.restaurants.exception.ErrorResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleCategoryNotFoundException(CategoryNotFoundException e) {
        ErrorResponse error = new ErrorResponse("Categoria no encontrada", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    } @ExceptionHandler(RestaurantNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleRestaurantNotFoundException(RestaurantNotFoundException e) {
        ErrorResponse error = new ErrorResponse("Restaurante no encontrado", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor: " + e.getMessage());
    }
}