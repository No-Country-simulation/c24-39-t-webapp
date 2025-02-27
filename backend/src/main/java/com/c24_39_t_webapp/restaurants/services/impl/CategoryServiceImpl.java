package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;
import com.c24_39_t_webapp.restaurants.models.Category;
import com.c24_39_t_webapp.restaurants.repository.CategoryRepository;
import com.c24_39_t_webapp.restaurants.services.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
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
}