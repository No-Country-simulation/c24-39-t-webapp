package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
//import lombok.AllArgsConstructor;
import com.c24_39_t_webapp.restaurants.exception.RestaurantNotFoundException;
import com.c24_39_t_webapp.restaurants.services.IRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/restaurant")
//@RequestMapping("/api/v1/restaurantes")
//@AllArgsConstructor
public class RestaurantController {
    @Autowired
    private IRestaurantService restaurantService;

    /**
     * Test endpoint to verify that the controller handles POST requests correctly.
     * Responds with a message including the received name parameter.
     *
     * @param name The name parameter received in the request body.
     * @return A string indicating that the controller works and including the received name.
     */
    @PostMapping
    public String testControllerPost(@RequestBody String name) {
        return "El metodo POST del controller de Restaurants funciona ok, " + name + "!";
    }

    /**
     * Another test endpoint demonstrating GET request handling.
     * Responds with a custom message.
     *
     * @return A string indicating that the GET method works.
     */
    @GetMapping(value = "/testMethod")
    public String testControllerGet() {
        return "El metodo GET del controller de Restaurants funciona ok!";
    }


    /**
     * Endpoint to retrieve a list of all {@link ResponseEntity} objects stored in the system.
     * Delegates the retrieval logic to {@link IRestaurantService#findAll()}.
     *
     * @return A list of {@code ContactDTO} objects representing all contacts.
     */
    @GetMapping
    public ResponseEntity<List<RestaurantResponseDto>> getAllRestaurants() {

        try {
            log.info("Solicitud recibida para obtener todos los restaurantes.");
            List<RestaurantResponseDto> restaurants = restaurantService.findAll();

            // Convertir la lista de restaurantes a DTOs
//            List<RestaurantResponseDto> responseDto = restaurants.stream()
//                    .map(restaurant -> new RestaurantResponseDto(
//                            restaurant.getRst_id(),
//                            restaurant.getName(),
//                            restaurant.getDescription(),
//                            restaurant.getPhone(),
//                            restaurant.getAddress(),
//                            restaurant.getLogo()
//                    ))
//                    .collect(Collectors.toList());

//            log.info("Se recuperaron {} restaurantes exitosamente.", responseDto.size());
//            return ResponseEntity.ok(responseDto);
            log.info("Se recuperaron {} restaurantes exitosamente.", restaurants.size());
            return ResponseEntity.ok(restaurants);

        } catch (RestaurantNotFoundException e) {
            log.error("Error: No se encontraron restaurantes", e);
            throw e;
        } catch (Exception e) {
            log.error("Error al obtener los restaurantes: {}", e.getMessage(), e);
            throw new RuntimeException("Error al obtener los restaurantes", e);
        }
    }

    /**
     * Endpoint to query a single restaurant based on the provided ID.
     * Delegates the query logic to {@link IRestaurantService#findById(Long)}.
     *
     * @param rst_id The ID of the restaurant to query.
     * @return The {@code RestaurantResponseDto} object representing the queried restaurant.
     */
    @GetMapping("/{rst_id}")
    public ResponseEntity<RestaurantResponseDto> findRestaurantById(@PathVariable Long rst_id) {

        try {
            log.info("Solicitud recibida para obtener un restaurante usando un id.");
            RestaurantResponseDto restaurant = restaurantService.findById(rst_id);

            log.info("Se recuperaró el restaurante exitosamente.");
            return ResponseEntity.ok(restaurant);

        } catch (RestaurantNotFoundException e) {
            log.error("Error: No se encontró el restaurante con ID: {}", rst_id, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error al obtener el restaurante con ID: {}", rst_id, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
