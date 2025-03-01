package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.exception.*;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.ProductRepository;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.repository.CategoryRepository;

import com.c24_39_t_webapp.restaurants.services.IProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final CategoryRepository categoryRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @PreAuthorize("hasAuthority('restaurante')")
    @Override
    public ProductResponseDto addProduct(ProductRequestDto productRequestDto, String email, Long restaurantId) {
        log.info("Intentando crear un producto para el usuario con email: {}", email);
        if (restaurantId == null || restaurantId <= 0) {
            throw new IllegalArgumentException("El ID del restaurante no es válido");
        }
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RestaurantNotFoundException("No se ha encontrado el restaurante"));
        Category category = categoryRepository.findById(productRequestDto.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException("No se ha encontrado la categoria"));

        Product product = new Product();
        product.setRestaurant(restaurant);
        product.setCategory(category);
        product.setName(productRequestDto.name());
        product.setDescription(productRequestDto.description());
        product.setPrice(productRequestDto.price());
        product.setImage(productRequestDto.image());
        product.setIsActive(productRequestDto.isActive());
        product.setQuantity(productRequestDto.quantity());
        log.info("Producto creado con éxito");


        product = productRepository.save(product);
        return new ProductResponseDto(
                product.getPrd_id(),
                product.getRestaurant().getRst_id(),
                product.getCategory().getCtg_id(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getIsActive(),
                product.getQuantity()
        );
    }

    @Override
    public List<ProductResponseDto> findAllProducts() {

        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            throw new ProductNotFoundException("No se encontraron productos.");
        }

        return products.stream()
                .map(product -> new ProductResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getRst_id(),
                        product.getCategory().getCtg_id(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getImage(),
                        product.getIsActive(),
                        product.getQuantity()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto findProductById(Long prd_id) {
        log.info("Buscando el product con ID: {}", prd_id);
        if (prd_id == null || prd_id <= 0) {
            log.warn("El ID del producto proporcionado es invalido: {}", prd_id);
            throw new ProductNotFoundException("El ID del producto no es válido " + prd_id);
        }
        return productRepository.findById(prd_id)
                .map(product -> new ProductResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getRst_id(),
                        product.getCategory().getCtg_id(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getImage(),
                        product.getIsActive(),
                        product.getQuantity()
                ))
                .orElseThrow(() -> {
                    log.warn("No se encontro un producto con el ID: {}", prd_id);
                    return new ProductNotFoundException("No se encontro una producto con ese ID: " + prd_id);
                });
    }

    @PreAuthorize("hasAuthority('restaurante')")
    @Transactional
    @Override
    public ProductResponseDto updateProduct(Long prd_id, ProductRequestDto updateDto) {
        log.info("Actualizando el producto con ID {}", prd_id);
        Product product = productRepository.findById(prd_id)
                .orElseThrow(() -> {
                    log.warn("El ID del producto proporcionado es invalido: {}", prd_id);
                    return new ProductNotFoundException("No se ha encontrado el producto con el ID " + prd_id);
                });
        Category category = categoryRepository.findById(updateDto.categoryId())
                .orElseThrow(() -> {
                    log.warn("El ID de la categoria proporcionada es invalido: {}", updateDto.categoryId());
                    return new CategoryNotFoundException("No se ha encontrado la categoria con el ID " + updateDto.categoryId());
                });
        product.setCategory(category);
        product.setName(updateDto.name());
        product.setDescription(updateDto.description());
        product.setPrice(updateDto.price());
        product.setImage(updateDto.image());
        product.setIsActive(updateDto.isActive());
        product.setQuantity(updateDto.quantity());

        Product updatedProduct = productRepository.saveAndFlush(product);
        log.info("Producto con ID {} ha sido actualizado con éxito", prd_id);
        return new ProductResponseDto(
                updatedProduct.getPrd_id(),
                updatedProduct.getRestaurant().getRst_id(),
                updatedProduct.getCategory().getCtg_id(),
                updatedProduct.getName(),
                updatedProduct.getDescription(),
                updatedProduct.getPrice(),
                updatedProduct.getImage(),
                updatedProduct.getIsActive(),
                updatedProduct.getQuantity()
        );
    }
    @Override
    @Transactional
    @PreAuthorize("hasAuthority('restaurante')")
    public void deleteProduct(Long prd_id) {
        if (!productRepository.existsById(prd_id)) {
            throw new ProductNotFoundException("Product no encontrado con id: " + prd_id);
        }
        productRepository.deleteById(prd_id);
    }
}



