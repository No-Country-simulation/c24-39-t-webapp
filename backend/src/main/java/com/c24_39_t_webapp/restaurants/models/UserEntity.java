package com.c24_39_t_webapp.restaurants.models;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="usuarios")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre")
    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Column(name="rol")
    private String role;

//
//    @Column(name="usr_telefono")
//    private String phone;
//
//    @Column(name="usr_direccion")
//    private String address;
//
//
//    @Column(name="usr_fecha_registro")
//    @CreationTimestamp
//    private LocalDateTime createdAt;
//
//    @UpdateTimestamp
//    private LocalDateTime updatedAt;

//Comprobar esto
//    public enum UserRole {
//        CLIENT,
//        RESTAURANT
//    }


}
