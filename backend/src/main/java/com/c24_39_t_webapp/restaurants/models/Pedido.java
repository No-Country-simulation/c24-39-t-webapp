package com.c24_39_t_webapp.restaurants.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pdd_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdd_cliente_id", nullable = false)
    private UserEntity cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdd_restaurante_id", nullable = false)
    private Restaurant restaurante;

    @Enumerated(EnumType.STRING)
    @Column(name = "pdd_estado", nullable = false)
    private EstadoPedido estado = EstadoPedido.PENDIENTE;

    @Column(name = "pdd_total", nullable = false)
    private Double total;

    @Column(name = "pdd_comentario")
    private String comentario;

    @Column(name = "pdd_fecha", nullable = false)
    private LocalDateTime fecha = LocalDateTime.now();
}

enum EstadoPedido {
    PENDIENTE, PAGADO, ENTREGADO, CANCELADO
}