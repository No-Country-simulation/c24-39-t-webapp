package com.c24_39_t_webapp.restaurants.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prd_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prd_restaurante_id", nullable = false)
    private Restaurant restaurante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prd_categoria_id", nullable = false)
    private Categoria categoria;

    @Column(name = "prd_nombre", nullable = false)
    private String nombre;

    @Column(name = "prd_descripcion")
    private String descripcion;

    @Column(name = "prd_precio", nullable = false)
    private Double precio;

    @Column(name = "prd_imagen")
    private String imagen;

    @Column(name = "prd_activo", nullable = false)
    private Boolean activo = true;

    @Column(name = "prd_cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "prd_fecha_alta", nullable = false)
    private LocalDateTime fechaAlta = LocalDateTime.now();
}
