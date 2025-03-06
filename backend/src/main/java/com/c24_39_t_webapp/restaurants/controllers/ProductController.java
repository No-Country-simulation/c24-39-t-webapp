package com.c24_39_t_webapp.restaurants.controllers;


import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductSummaryResponseDto;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    /**
     * Endpoint to update an existing {@link ProductResponseDto} object in the system.
     * Delegates the update logic to {@link IProductService#updateProduct(Long, ProductRequestDto)}.
     *
     * @param prd_id The ID of the product to update.
     * @param updateDto The {@code ProductRequestDto} object containing the updated product details.
     * @return The {@code ProductResponseDto} object representing the updated product.
     */

    @PatchMapping("/{prd_id}")
    public ResponseEntity<ProductResponseDto> updateProduct(@PathVariable Long prd_id, @RequestBody ProductRequestDto updateDto) {
        log.info("Solicitud recibida para actualizar el producto con ID: {}", prd_id);
        ProductResponseDto updatedProduct = productService.updateProduct(prd_id, updateDto);
        log.info("Producto con ID: {} actualizado exitosamente", prd_id);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Endpoint to delete an existing {@link ProductResponseDto} object from the system.
     * Delegates the deletion logic to {@link IProductService#deleteProduct(Long)}.
     *
     * @param prd_id The ID of the product to delete.
     * @return A {@link ResponseEntity} object with no content to indicate a successful deletion.
     */
    @DeleteMapping("/{prd_id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long prd_id) {
        log.info("Solicitud recibida para eliminar el producto con ID: {}", prd_id);
        productService.deleteProduct(prd_id);
        log.info("Producto con ID: {} eliminado exitosamente", prd_id);
        return ResponseEntity.noContent().build();
    }
    /**
     * Endpoint to retrieve a list of all {@link ProductSummaryResponseDto} objects stored in the system.
     * Delegates the retrieval logic to {@link IProductService#findProductsByCategory(Long)}.
     *
     * @param categoryId The ID of the category to retrieve products for.
     * @return A list of {@code ProductSummaryResponseDto} objects representing all products in the specified category.
     */
//    @GetMapping(value = "/byCategory/{categoryId}")
//    public ResponseEntity<List<ProductSummaryResponseDto>> findProductsByCategory(@PathVariable Long categoryId) {
//        log.info("Solicitud recibida para obtener productos por categoria con ID: {}", categoryId);
//        List<ProductSummaryResponseDto> products = productService.findProductsByCategory(categoryId);
//        log.info("Se recuperaron {} productos por categoria con ID: {} exitosamente.", products.size(), categoryId);
//        return ResponseEntity.ok(products);
//    }
    @GetMapping(value = "/byCategory/{category}")
    public ResponseEntity<List<ProductSummaryResponseDto>> findProductsByCategory(@PathVariable Category category) {
        log.info("Solicitud recibida para obtener productos por categoria con ID: {}", category);
        List<ProductSummaryResponseDto> products = productService.findProductsByCategory(category);
        log.info("Se recuperaron {} productos por categoria con ID: {} exitosamente.", products.size(), category);
        return ResponseEntity.ok(products);
    }
    /**
     * Endpoint to retrieve a list of all {@link ProductSummaryResponseDto} objects stored in the system.
     * Delegates the retrieval logic to {@link IProductService#findProductsByName(String)}.
     *
     * @param name The name of the product to retrieve.
     * @return A list of {@code ProductSummaryResponseDto} objects representing all products with the specified name.
     */
    @GetMapping(value = "/byName")
    public ResponseEntity<List<ProductSummaryResponseDto>> findProductsByName(@RequestParam String name) {
        log.info("Solicitud recibida para obtener productos por categoria con ID: {}", name);
        List<ProductSummaryResponseDto> products = productService.findProductsByName(name);
        log.info("Se recuperaron {} productos por categoria con ID: {} exitosamente.", products.size(), name);
        return ResponseEntity.ok(products);
    }

    /**
     * Endpoint to retrieve a list of all {@link ProductSummaryResponseDto} objects stored in the system.
     * Delegates the retrieval logic to {@link IProductService#findProductsByRestaurant(Restaurant)}.
     *
     * @param restaurant The restaurant to retrieve products for.
     * @return A list of {@code ProductSummaryResponseDto} objects representing all products in the specified restaurant.
     */
    @GetMapping(value = "/byRestaurant/{restaurant}")
    public ResponseEntity<List<ProductSummaryResponseDto>> findProductsByRestaurant(@PathVariable Restaurant restaurant) {
        log.info("Solicitud recibida para obtener productos del restaurante: {}", restaurant);
        List<ProductSummaryResponseDto> products = productService.findProductsByRestaurant(restaurant);
        log.info("Se recuperaron {} productos del restaurante: {} exitosamente.", products.size(), restaurant);
        return ResponseEntity.ok(products);
    }
}
