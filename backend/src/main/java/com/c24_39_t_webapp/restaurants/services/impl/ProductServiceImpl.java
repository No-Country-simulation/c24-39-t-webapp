package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.ProductUpdateDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.exception.UnauthorizedException;
import com.c24_39_t_webapp.restaurants.exception.user_implementations.ResourceNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.ProductRepository;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public ProductResponseDto addProduct(ProductUpdateDto productUpdateDto, UserDetailsImpl userDetails) {
        Product newProduct = new Product();
        newProduct.setRestaurant(productUpdateDto.restaurant());
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
    public List<Product> findByName(String name) {
        return productRepository.findByNameContains(name);
    }

    @Override
    public List<Product> findByCategory(Category category) {
        return productRepository.findByCategory(category);
    }
//    Depende de que

//    Todos los productos sin distincion
    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return List.of();
    }

        @Override
    public Product updateProduct(ProductUpdateDto productUpdateDto, Product product, UserDetailsImpl userDetails) {
        log.info("looking resources");
        UserEntity user =
                userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new ResourceNotFoundException("El usuario no existe!"));
        Restaurant restaurant =
                restaurantRepository.findById(product.getRestaurant().getRst_id()).orElseThrow(() -> new ResourceNotFoundException("El restaurante no existe"));

        log.info("Validating Permissions User-Restaurant");
        validateUserPermissions(user, restaurant);

        Product productToSave = getProductById(product.getPrd_id());

        log.info("Comparing wanted update fields");
        Optional.ofNullable(productUpdateDto.category()).ifPresent(productToSave::setCategory);
        Optional.ofNullable(productUpdateDto.name()).ifPresent(productToSave::setName);
        Optional.ofNullable(productUpdateDto.description()).ifPresent(productToSave::setDescription);
        Optional.ofNullable(productUpdateDto.price()).ifPresent(productToSave::setPrice);
        Optional.ofNullable(productUpdateDto.image()).ifPresent(productToSave::setImage);
        Optional.ofNullable(productUpdateDto.isActive()).ifPresent(productToSave::setIsActive);
        Optional.ofNullable(productUpdateDto.quantity()).ifPresent(productToSave::setQuantity);

        log.info("Saving Resource");
        return productRepository.save(productToSave);
    }

    @Override
    public void deleteProduct(Product product, UserDetailsImpl userDetails) {
        log.info("looking user - restaurant resources");
        UserEntity user =
                userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new ResourceNotFoundException("El usuario no existe!"));
        Restaurant restaurant =
                restaurantRepository.findById(product.getRestaurant().getRst_id()).orElseThrow(() -> new ResourceNotFoundException("El restaurante no existe"));

        log.info("Validating User Permission before delete a resource");
        validateUserPermissions(user, restaurant);
        Product productToDelete = getProductById(product.getPrd_id());
        productRepository.delete(productToDelete);
    }


//    todos los productos por restaurante

    @Override
    public List<Product> getAllProductsByRestaurant(Restaurant restaurant) {
        Restaurant restaurantInDb =
                restaurantRepository.findById(restaurant.getRst_id()).orElseThrow(() -> new ResourceNotFoundException("Restaurante no Valido"));
        return productRepository.findByRestaurant(restaurantInDb);
    }

    // Métodos privados reutilizables




    private Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El Producto no existe!"));
    }

    private void validateUserPermissions(UserEntity user, Restaurant restaurant) {
        if (!restaurant.getUserEntity().getId().equals(user.getId())) {
            throw new UnauthorizedException("El usuario no tiene permisos para el cambio");
        }
    }

}
