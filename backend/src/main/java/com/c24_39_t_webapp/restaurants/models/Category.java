package com.c24_39_t_webapp.restaurants.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "categorias")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ctg_id")
    private Long id;

    @Column(name = "ctg_nombre", nullable = false)
    private String name;

    @Column(name = "ctg_descripcion")
    private String description;

    @Column(name = "ctg_fecha_alta", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
