package com.c24_39_t_webapp.restaurants.exception;

public class ErrorResponse {
    private String title;
    private String detail;
    public ErrorResponse(String title, String detail) {
        this.title = title;
        this.detail = detail;
    }
    // Constructor, getters, setters
}