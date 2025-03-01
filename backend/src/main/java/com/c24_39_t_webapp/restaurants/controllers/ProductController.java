package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductUpdateDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import com.c24_39_t_webapp.restaurants.services.impl.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private IProductService iProductService;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody @Valid final ProductUpdateDto productUpdateDto,
                    @AuthenticationPrincipal final UserDetailsImpl userDetails) {
        ProductResponseDto product = iProductService.addProduct(productUpdateDto, userDetails);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = iProductService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/api/restaurant/products")
    public ResponseEntity<?> getAllProductsByRestaurant(Restaurant restaurant) {
        List<Product> products = iProductService.getAllProductsByRestaurant(restaurant);
        return ResponseEntity.ok(products);
    }

    /**
     * EndPoint to register find products by name
     * @param name of the wanted object
     * @return if not found gives a response entity ok with info message, or response ok with the results
     */

    @GetMapping("/name")
    public ResponseEntity<?> findProductsByName(@RequestBody String name) {
        List<Product> products = iProductService.findByName(name);
        if (products.isEmpty()) {
            return ResponseEntity.ok("Producto no encontrado");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<?> filterByCategory(@RequestBody Category category) {
        List<Product> products = iProductService.findByCategory(category);
        if (products.isEmpty()) {
            return ResponseEntity.ok("Producto no encontrado");
        }
        return ResponseEntity.ok(products);
    }

    @PutMapping
    public ResponseEntity<?> updateProduct(@RequestBody ProductUpdateDto productData,
                 @RequestBody @Valid final Product product,
                 @AuthenticationPrincipal final UserDetailsImpl userDetails){
        Product products = iProductService.updateProduct(productData, product, userDetails);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProduct(@RequestBody final Product product,
             @AuthenticationPrincipal UserDetailsImpl userDetails) {
         iProductService.deleteProduct(product,userDetails);
        return ResponseEntity.ok().build();
    }



}
