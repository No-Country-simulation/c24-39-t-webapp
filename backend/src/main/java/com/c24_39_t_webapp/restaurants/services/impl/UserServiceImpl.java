package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.UserUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.UserResponseDto;
import com.c24_39_t_webapp.restaurants.exception.UserNotFoundException;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto updateUser(UserUpdateRequestDto request, String username) {
        log.info("Getting from db the needed resource with username: {}", username);
        UserEntity user =
                userRepository
                        .findByEmail(username).orElseThrow(() -> {
                            log.warn("User not found: {}", username);
                            return new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Not found");
                        });

        Optional.ofNullable(request.email()).ifPresent(user::setEmail);
        Optional.ofNullable(request.name()).ifPresent(user::setName);
        Optional.ofNullable(request.address()).ifPresent(user::setAddress   );
        Optional.ofNullable(request.phone()).ifPresent(user::setPhone);
        if (request.password() != null) {
            user.setPassword(passwordEncoder.encode(request.password()));
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
