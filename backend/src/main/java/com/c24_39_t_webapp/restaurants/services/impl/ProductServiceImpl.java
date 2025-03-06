package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductUpdateDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.RestaurantResponseDto;
import com.c24_39_t_webapp.restaurants.exception.UnauthorizedException;
import com.c24_39_t_webapp.restaurants.exception.user_implementations.ResourceNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.repository.ProductRepository;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
@Transactional
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public ProductResponseDto addProduct(ProductUpdateDto productUpdateDto, UserDetailsImpl userDetails) {
        Restaurant restaurant =
                restaurantRepository.findById(productUpdateDto.restaurant().getRst_id()).orElseThrow(() -> new ResourceNotFoundException("No se encontro el Restaurante buscado!"));
        validateUserPermissions(userDetails.getId(), restaurant.getUserEntity().getId());

        Product newProduct = new Product();
        newProduct.setRestaurant(restaurant);
        newProduct.setIsActive(true);
        newProduct.setName(productUpdateDto.name());
        newProduct.setImage(productUpdateDto.image());
        newProduct.setCategory(productUpdateDto.category());
        newProduct.setPrice(productUpdateDto.price());
        newProduct.setDescription(productUpdateDto.description());
        newProduct.setQuantity(productUpdateDto.quantity());
        productRepository.save(newProduct);
        return new ProductResponseDto(newProduct);
    }

    @Override
    public List<ProductResponseDto> findByName(String name) {
        List<Product> products = productRepository.findByNameContains(name);
        return convertToDto(products);
    }

    @Override
    public List<ProductResponseDto> findByCategory(Category category) {
        List<Product> products = productRepository.findByCategory(category);
        return convertToDto(products);
    }
//    Todos los productos sin distincion
    @Override
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
       return convertToDto(products);
    }

        @Override
    public ProductResponseDto updateProduct(ProductUpdateDto productUpdateDto, Product product, UserDetailsImpl userDetails) {
        log.info("looking resources");
        Restaurant restaurant =
                restaurantRepository.findById(product.getRestaurant().getRst_id()).orElseThrow(() -> new ResourceNotFoundException("El restaurante no existe"));

        log.info("Validating Permissions User-Restaurant");
        validateUserPermissions(userDetails.getId(), restaurant.getUserEntity().getId());

        Product productToSave = getProductById(product.getPrd_id());

        log.warn("Comparing wanted update fields");
        Optional.ofNullable(productUpdateDto.category()).ifPresent(productToSave::setCategory);
        Optional.ofNullable(productUpdateDto.name()).ifPresent(productToSave::setName);
        Optional.ofNullable(productUpdateDto.description()).ifPresent(productToSave::setDescription);
        Optional.ofNullable(productUpdateDto.price()).ifPresent(productToSave::setPrice);
        Optional.ofNullable(productUpdateDto.image()).ifPresent(productToSave::setImage);
        Optional.ofNullable(productUpdateDto.isActive()).ifPresent(productToSave::setIsActive);
        Optional.ofNullable(productUpdateDto.quantity()).ifPresent(productToSave::setQuantity);

        log.warn("Saving Resource");
        productRepository.save(productToSave);
        log.info("Resource Saved");
            return new ProductResponseDto(productToSave);
    }

    @Override
    public void deleteProduct(Product product, UserDetailsImpl userDetails) {
        log.info("looking user - restaurant resources");
        Restaurant restaurant =
                restaurantRepository.findById(product.getRestaurant().getRst_id()).orElseThrow(() -> new ResourceNotFoundException("El restaurante no existe"));

        log.info("Validating User Permission before delete a resource");
        validateUserPermissions(userDetails.getId(), restaurant.getUserEntity().getId());
        log.info("Getting resource");
        Product productToDelete = getProductById(product.getPrd_id());
        log.warn("Deleting Resource");
        productRepository.delete(productToDelete);
    }


//    todos los productos por restaurante

    @Override
    public List<ProductResponseDto> getAllProductsByRestaurant(Restaurant restaurant) {
        List<Product> products = productRepository.findByRestaurant(restaurant);
        return convertToDto(products);
    }

    // Métodos privados reutilizables

    private Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El Producto no existe!"));
    }

//    Private methods

    private void validateUserPermissions(Long userId, Long rstId) {
        if (!rstId.equals(userId)) {
            throw new UnauthorizedException("El usuario no tiene permisos para el cambio");
        }
    }

    private List<ProductResponseDto> convertToDto(List<Product> products) {
        return products.stream().map(product -> new ProductResponseDto(product.getPrd_id(),
                product.getRestaurant(),
                product.getCategory(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getIsActive(),
                product.getQuantity())).collect(Collectors.toList());

    }
}
