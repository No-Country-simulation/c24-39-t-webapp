package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.exception.CategoryNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.repository.CategoryRepository;
import com.c24_39_t_webapp.restaurants.services.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
@Transactional
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto) {
        Category newCategory = new Category();

        newCategory.setName(categoryRequestDto.getName());
        newCategory.setDescription(categoryRequestDto.getDescription());

        Category savedCategory = categoryRepository.save(newCategory);

        return new CategoryResponseDto(
                savedCategory.getCtg_id(),
                savedCategory.getName(),
                savedCategory.getDescription()
        );
    }

    @Override
    public List<CategoryResponseDto> findAllCategories() {


        List<Category> categories = categoryRepository.findAll();

        if (categories.isEmpty()) {
            throw new RuntimeException("No se encontraron categorías.");
        }

        return categories.stream()
                .map(category -> new CategoryResponseDto(
                        category.getCtg_id(),
                        category.getName(),
                        category.getDescription()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDto findCategoryById(Long ctg_id) {
        log.info("Buscando categoria con ID: {}", ctg_id);
//        Restaurant restaurant = restaurantRepository.findById(id)
        if (ctg_id == null || ctg_id <= 0) {
            log.warn("El ID de la categoria proporcionada es invalido: {}", ctg_id);
            throw new CategoryNotFoundException("El ID de la categoria no es válido " + ctg_id);
        }
        return categoryRepository.findById(ctg_id)
                .map(category -> new CategoryResponseDto(
                        category.getCtg_id(),
                        category.getName(),
                        category.getDescription()
                ))
                .orElseThrow(() -> {
                    log.warn("No se encontro un gasto con el ID: {}", ctg_id);
                    throw new CategoryNotFoundException("No se encontro una categoria con ese ID: " + ctg_id);
                });
    }

    @Override
    public CategoryResponseDto updateCategory(Long ctg_id, CategoryRequestDto updateDto) {
        log.info("Actualizando la categoria con ID {}", ctg_id);
        Category category = categoryRepository.findById(ctg_id)
                .orElseThrow(() -> {
                    log.warn("No se encontró una categoria con ese ID para editar: {}", ctg_id);
                    return new CategoryNotFoundException(("No se encontró una categoria con ese ID para editar: " + ctg_id));
                });
        category.setName(updateDto.getName());
        category.setDescription(updateDto.getDescription());

        Category updatedCategory = categoryRepository.save(category);
        log.info("Categoria actualizado exitosamente: {}", updatedCategory);
        return new CategoryResponseDto(updatedCategory);
    }

    @Override
    public CategoryResponseDto deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Restaurante no encontrado con id: " + id);
        }
        categoryRepository.deleteById(id);
        return null;
    }
}