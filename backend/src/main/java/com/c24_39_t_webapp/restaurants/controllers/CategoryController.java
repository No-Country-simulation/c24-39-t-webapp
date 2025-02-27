package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.exception.CategoryNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.RestaurantNotFoundException;
import com.c24_39_t_webapp.restaurants.services.ICategoryService;
import com.c24_39_t_webapp.restaurants.services.IRestaurantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    /**
     * Test endpoint to verify that the controller handles POST requests correctly.
     * Responds with a message including the received name parameter.
     *
     * @param name The name parameter received in the request body.
     * @return A string indicating that the controller works and including the received name.
     */
    @PostMapping(value = "/testPostMethod")
    public String testControllerPost(@RequestBody String name) {
        return "El metodo POST del controller de Categories funciona ok, " + name + "!";
    }

    /**
     * Another test endpoint demonstrating GET request handling.
     * Responds with a custom message.
     *
     * @return A string indicating that the GET method works.
     */
    @GetMapping(value = "/testMethod")
    public String testControllerGet() {
        return "El metodo GET del controller de Categories funciona ok!";
    }

    /**
     * Endpoint to add a new {@link ResponseEntity} object to the system.
     * Delegates the addition logic to {@link ICategoryService#addCategory(CategoryRequestDto)}.
     *
     * @param categoryRequestDto The {@code CategoryRequestDto} object to add.
     * @return The {@code CategoryResponseDto} object representing the added category.
     */
    @PostMapping
    public ResponseEntity<CategoryResponseDto> addCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
        try {
            log.info("Solicitud recibida para agregar una nueva categoria: {}", categoryRequestDto);
            CategoryResponseDto category = categoryService.addCategory(categoryRequestDto);

            log.info("Categoria agregada exitosamente: {}", category);
            return ResponseEntity.ok(category);

        } catch (Exception e) {
            log.error("Error al agregar la categoria: {}", e.getMessage(), e);
            throw new RuntimeException("Error al agregar la categoria, ", e);
        }
    }


    /**
     * Endpoint to retrieve a list of all {@link ResponseEntity} objects stored in the system.
     * Delegates the retrieval logic to {@link ICategoryService#findAllCategories()}.
     *
     * @return A list of {@code ContactDTO} objects representing all contacts.
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories() {

        try {
            log.info("Solicitud recibida para obtener todos las categorias.");
            List<CategoryResponseDto> categories = categoryService.findAllCategories();

            log.info("Se recuperaron {} categorias exitosamente.", categories.size());
            return ResponseEntity.ok(categories);

        } catch (CategoryNotFoundException e) {
            log.error("Error: No se encontraron categorias, ", e);
            throw e;
        } catch (Exception e) {
            log.error("Error al obtener las categorias: {}", e.getMessage(), e);
            throw new RuntimeException("Error al obtener las categorias, ", e);
        }
    }


}