package com.c24_39_t_webapp.restaurants.models;

import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.User;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rvw_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rvw_id_restaurante", nullable = false)
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rvw_id_usuario", nullable = false)
    private User user;

    @Column(name = "rvw_puntaje", nullable = false)
    private Integer score;

    @Column(name = "rvw_comentario")
    private String coments;

    @Column(name = "rvw_fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}