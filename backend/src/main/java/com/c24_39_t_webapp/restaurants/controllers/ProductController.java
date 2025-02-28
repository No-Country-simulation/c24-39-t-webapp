package com.c24_39_t_webapp.restaurants.controllers;


import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private IProductService productService;

//    public ProductController(IProductService productService) {
//        this.productService = productService;
//    }

    @PostMapping
    public ResponseEntity<ProductResponseDto> addProduct(@RequestBody ProductRequestDto requestDto, @RequestParam String email, @RequestParam Long restaurantId) {
        log.info("Recibida solicitud para añadir producto. Email: {}, RestaurantId: {}", email, restaurantId);
        log.info("Datos del producto: {}", requestDto);
        ProductResponseDto responseDto = productService.addProduct(requestDto, email, restaurantId);
        log.info("Producto agregado exitosamente: {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }
//
//
//    @GetMapping
//    public ResponseEntity<List<ProductResponse>> getAllProducts() {
//        List<ProductResponse> products = productService.getAllProducts();
//        return ResponseEntity.ok(products);
//    }
//
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ProductResponse> findByProduct(@PathVariable Long id) {
//        ProductResponse product = productService.findByProduct(id);
//        return ResponseEntity.ok(product);
//    }
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
