package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.UserUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.UserResponseDto;

public interface IUserService {

    UserResponseDto updateUser(UserUpdateRequestDto request, String username);

}
