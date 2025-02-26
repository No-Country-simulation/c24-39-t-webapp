package com.c24_39_t_webapp.restaurants.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryRequestDto {
    @NotBlank(message = "El nombre de la categoria no puede estar vacío.")
    @Size(max = 60, message = "El nombre de la categoria no puede tener más de 40 caracteres.")
    private String name;

    @NotBlank(message = "La descripción  de la categoria no puede estar vacía.")
    @Size(max = 500, message = "El nombre de la categoria no puede tener más de 500 caracteres.")
    private String description;
}