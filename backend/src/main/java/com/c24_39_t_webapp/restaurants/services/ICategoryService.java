package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.CategoryRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.CategoryResponseDto;

import java.util.List;

public interface ICategoryService {

    List<CategoryResponseDto> findAllCategorys();

    CategoryResponseDto findCategoryById(Long id);

    CategoryResponseDto updateCategory(Long id, CategoryRequestDto updateDto);

    CategoryResponseDto deleteCategory(Long id);
}