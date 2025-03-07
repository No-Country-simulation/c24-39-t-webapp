package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.UserUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.UserResponseDto;
import com.c24_39_t_webapp.restaurants.exception.UserNotFoundException;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDto updateUser(UserUpdateRequestDto request, String username) {
        log.info("Getting from db the needed resource with username: {}", username);
        UserEntity user =
                userRepository
                        .findByEmail(username).orElseThrow(() -> {
                            log.warn("User not found: {}", username);
                            return new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Not found");
                        });
        if (request.email() != null) {
            user.setEmail(request.email());
        }
        if (request.name() != null) {
            user.setName(request.name());
        }
        if (request.address() != null) {
            user.setAddress(request.address());
        }
        if (request.phone() != null) {
            user.setPhone(request.phone());
        }
        if (request.password() != null) {
            user.setPassword(request.password());
        }
        userRepository.save(user);
        log.info("Resource saved");
        UserResponseDto userRes = new UserResponseDto(user);
        return userRes;
    }

    private UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("El Usuario no Existe!"));
    }

}
