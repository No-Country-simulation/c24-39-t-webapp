package com.c24_39_t_webapp.restaurants.repository;

import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Aquí se pueden agregar métodos de consulta personalizados si es necesario
    @Query("SELECT p FROM Product p WHERE p.category.ctg_id = :categoryId")
    List<Product> findProductsByCategory(@Param("categoryId") Long categoryId);
}