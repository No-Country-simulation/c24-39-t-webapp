package com.c24_39_t_webapp.restaurants.services.impl;


import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductSummaryResponseDto;
import com.c24_39_t_webapp.restaurants.exception.CategoryNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.ProductNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.RestaurantNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;

import com.c24_39_t_webapp.restaurants.repository.CategoryRepository;
import com.c24_39_t_webapp.restaurants.repository.ProductRepository;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
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


    @Override
    public ProductResponseDto addProduct(ProductRequestDto productRequestDto) {
        log.info("Intentando crear un producto para el restaurante con ID: {}", productRequestDto.restaurantId());
//        if (restaurantId == null || restaurantId <= 0) {
//            throw new IllegalArgumentException("El ID del restaurante no es válido");
//        }
        Restaurant restaurant = restaurantRepository.findById(productRequestDto.restaurantId())
                .orElseThrow(() -> new RestaurantNotFoundException("No se ha encontrado el restaurante"));
        Category category = categoryRepository.findById(productRequestDto.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException("No se ha encontrado la categoria"));
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Recuperando el email del usuario de la autenticacion: {}", userEmail);
        log.info("Recuperando el email del usuario del restaurante: {}", restaurant.getUserEntity().getEmail());

        if (!restaurant.getUserEntity().getEmail().equals(userEmail)) {
            throw new SecurityException("No tienes permiso para añadir productos a este restaurante");
        }
        log.info("Usuario autenticado con email: {}", userEmail);
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
                product.getRestaurant().getId(),
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
        log.info("Recuperando todos los productos.");
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            throw new ProductNotFoundException("No se encontraron productos.");
        }
        return products.stream()
                .map(product -> new ProductResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getId(),
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
        log.info("Buscando el product con ID: {}", prd_id);
        return productRepository.findById(prd_id)
                .map(product -> new ProductResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getId(),
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
                updatedProduct.getRestaurant().getId(),
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
    public void deleteProduct(Long prd_id) {
        if (!productRepository.existsById(prd_id)) {
            throw new ProductNotFoundException("Product no encontrado con id: " + prd_id);
        }
        productRepository.deleteById(prd_id);
    }

    @Override
//    public List<ProductSummaryResponseDto> findProductsByCategory(Long ctg_Id) {
//        log.info("Recuperando los producto de la categoria con ID {}", ctg_Id);
//        List<Product> products = productRepository.findProductsByCategory(ctg_Id);
//
//        if (products.isEmpty()) {
//            throw new ProductNotFoundException("No se encontraron productos para la categoría con id: " + ctg_Id);
    public List<ProductSummaryResponseDto> findProductsByCategory(Category category) {
        log.info("Recuperando los producto de la categoria con ID {}", category);
        List<Product> products = productRepository.findProductsByCategory(category);

        if (products.isEmpty()) {
            throw new ProductNotFoundException("No se encontraron productos para la categoría con id: " + category);
        }

        return products.stream()
                .map(product -> new ProductSummaryResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getId(),
                        product.getCategory().getCtg_id(),
                        product.getName(),
                        product.getDescription(),
                        product.getImage()
                ))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductSummaryResponseDto> findProductsByName(String name) {
        log.info("Buscando el product con ID: {}", name);
        if (name == null || name.trim().isEmpty()) {
            log.warn("El nombre del producto proporcionado no es valido: {}", name);
            throw new IllegalArgumentException("El nombre del producto no puede ser nulo o estar vacío");
        }
        name = name.trim();
        if (name.length() < 2) {
            log.warn("El nombre del producto es demasiado corto: {}", name);
            throw new IllegalArgumentException("El nombre del producto debe tener al menos 2 caracteres");
        }
        return productRepository.findProductsByName(name)
                .stream()
                .map(product -> new ProductSummaryResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getId(),
                        product.getCategory().getCtg_id(),
                        product.getName(),
                        product.getDescription(),
                        product.getImage()
                ))
                .collect(Collectors.toList());
    }
  
    @Override
    public List<ProductResponseDto> findProductsByRestaurant(Restaurant restaurant) {
        log.info("Buscando productos del restaurante con ID: {}", restaurant.getId());
//        if (newRestaurant == null || newRestaurant <= 0) {
//            log.warn("El ID del restaurante proporcionado es invalido: {}", restaurantId);
//            throw new ProductNotFoundException("El ID del restaurante no es válido " + restaurantId);
//        }
//        Restaurant newRestaurant = restaurantRepository.findById(restaurant.rst_id());

        List<Product> products = productRepository.findProductsByRestaurant(restaurant);
        return products.stream()
                .map(product -> new ProductResponseDto(
                        product.getPrd_id(),
                        product.getRestaurant().getId(),
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
}



