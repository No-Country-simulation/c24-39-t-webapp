package com.c24_39_t_webapp.restaurants.config.segurity;

import com.c24_39_t_webapp.restaurants.services.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final CustomUserDetailService userDetailService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**", "/auth/**", "/h2-console",
                                "/api/restaurant/testMethod", "/api/restaurant/testPostMethod").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/category/**", "/api/restaurant/**", "/api/product/**", "/api/order/**").permitAll()
//                        .requestMatchers("/api/restaurant/**").hasAuthority("restaurante")
//                        .requestMatchers("/api/category/**").hasAuthority("restaurante")
//                        .requestMatchers("/api/product/**").permitAll()
                        .requestMatchers("/api/category/**", "/api/restaurant/**", "/api/product/**").hasAuthority("restaurante")
                        .requestMatchers("/api/order/**").permitAll()
                        .requestMatchers("/api/user/**").hasAuthority("cliente")
                        .anyRequest().authenticated())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception{
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder () {
       return new BCryptPasswordEncoder();
    }

}
