package com.c24_39_t_webapp.restaurants.exception;

public class ResourceNotFoundException extends NotFoundException {
    private final String resourceName;

    public ResourceNotFoundException(String resourceName, String fieldName, String fieldValue) {
        super(String.format("%s no encontrado con %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
    }

    @Override
    public String getResourceName() {
        return this.resourceName;
    }
}
