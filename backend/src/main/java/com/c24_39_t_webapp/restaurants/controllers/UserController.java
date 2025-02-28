package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.UserUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.UserResponseDto;
import com.c24_39_t_webapp.restaurants.services.IUserService;
import com.c24_39_t_webapp.restaurants.services.impl.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @PutMapping
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody final UserUpdateRequestDto userdata,
        @AuthenticationPrincipal final UserDetailsImpl userDetails) {
        UserResponseDto user = userService.updateUser(userdata, userDetails.getUsername());
        return ResponseEntity.ok(user);
    }
}
