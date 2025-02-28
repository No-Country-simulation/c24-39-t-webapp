package com.c24_39_t_webapp.restaurants.controllers;


import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.services.ICategoryService;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private IProductService productService;

//    public ProductController(IProductService productService) {
//        this.productService = productService;
//    }
    /**
     * Endpoint to add a new {@link ResponseEntity} object to the system.
     * Delegates the addition logic to {@link IProductService#addProduct(ProductRequestDto, String, Long)}.
     *
     * @param requestDto The {@code CategoryRequestDto} object to add.
     * @param email The email of the user adding the category.
     * @pram restaurantId The ID of the restaurant to which the category will be added.
     * @return The {@code CategoryResponseDto} object representing the added category.
     */
    @PostMapping
    public ResponseEntity<ProductResponseDto> addProduct(@RequestBody ProductRequestDto requestDto, @RequestParam String email, @RequestParam Long restaurantId) {
        log.info("Recibida solicitud para añadir producto. Email: {}, RestaurantId: {}", email, restaurantId);
        log.info("Datos del producto: {}", requestDto);
        ProductResponseDto responseDto = productService.addProduct(requestDto, email, restaurantId);
        log.info("Producto agregado exitosamente: {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }

    /**
     * Endpoint to retrieve all {@link ProductResponseDto} objects from the system.
     * Delegates the retrieval logic to {@link IProductService#findAllProducts()}.
     *
     * @return A list of {@code ProductResponseDto} objects representing all products in the system.
     */
    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        log.info("Solicitud recibida para obtener todos los productos.");
        List<ProductResponseDto> products = productService.findAllProducts();
        log.info("Se recuperaron {} productos exitosamente.", products.size());
        return ResponseEntity.ok(products);
    }

    /**
     * Endpoint to retrieve a single {@link ProductResponseDto} object from the system.
     * Delegates the retrieval logic to {@link IProductService#findProductById(Long)}.
     *
     * @param prd_id The ID of the product to retrieve.
     * @return The {@code ProductResponseDto} object representing the requested product.
     */
    @GetMapping("/{prd_id}")
    public ResponseEntity<ProductResponseDto> findProductById(@PathVariable Long prd_id) {
        log.info("Solicitud recibida para obtener una producto usando el ID {}.", prd_id);
        ProductResponseDto product = productService.findProductById(prd_id);
        log.info("Se recuperó el producto con ID {} exitosamente.", prd_id);
        return ResponseEntity.ok(product);
    }
//
//
//    @GetMapping("/filter")
//    public ResponseEntity<List<ProductResponse>> filterByCategory(@RequestParam String category) {
//        List<ProductResponse> products = productService.filterByCategory(category);
//        return ResponseEntity.ok(products);
//    }
//
//
//    @PutMapping("/{id}")
//    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
//        ProductResponse updatedProduct = productService.updateProduct(id, request);
//        return ResponseEntity.ok(updatedProduct);
//    }
//
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
//        productService.deleteProduct(id);
//        return ResponseEntity.noContent().build();
//    }
}
