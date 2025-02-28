package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.exception.NotFoundException;
import com.c24_39_t_webapp.restaurants.exception.ResourceNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.ProductRepository;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.repository.CategoryRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@AllArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponseDto addProduct(ProductRequestDto productRequestDto, String email, Long restaurantId) {
        log.info("Intentando crear un producto para el usuario con email: {}", email);
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Intento fallido: Usuario con email {} no encontrado", email);
                    return new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuario no registrado");
                });
        if (!user.getRole().equals("RESTAURANT")) {
            log.warn("Intento fallido: Usuario con el Rol {} no está autorizado", user.getRole());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permisos para crear un Producto");
        }

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurante", "id", restaurantId.toString()));
        Category category = categoryRepository.findById(productRequestDto.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", productRequestDto.categoryId().toString()));

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
}

