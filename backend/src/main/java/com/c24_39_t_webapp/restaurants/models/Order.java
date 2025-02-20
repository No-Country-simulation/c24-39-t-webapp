package com.c24_39_t_webapp.restaurants.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pedidos")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pdd_id")
    private Long ord_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdd_cliente_id", nullable = false)
    private UserEntity userEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdd_restaurante_id", nullable = false)
    private Restaurant restaurant;

    @Enumerated(EnumType.STRING)
    @Column(name = "pdd_estado", nullable = false)
    private OrderState estate = OrderState.pendiente;

    @Column(name = "pdd_total", nullable = false)
    private Double total;

    @Column(name = "pdd_comentario")
    private String coments;

    @Column(name = "pdd_fecha", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "pdd_fecha_actualizacion", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

enum OrderState {
    pendiente, pagado, entregado, cancelado
}