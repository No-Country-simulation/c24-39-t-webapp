package com.c24_39_t_webapp.restaurants.models;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id")
    private Long usr_id;

    @Column(name = "usr_nombre")
    private String name;

    @Column(name = "usr_email")
    private String email;

    @Column(name = "usr_contrasena")
    private String password;

    @Column(name = "usr_telefono")
    private String phone;

    @Column(name = "usr_direccion")
    private String address;

    @Column(name = "usr_tipo")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "usr_fecha_registro", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(name = "usr_fecha_actualizacion", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum UserRole {
        cliente,
        restaurante
    }
}
