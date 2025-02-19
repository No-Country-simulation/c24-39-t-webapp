package com.c24_39_t_webapp.restaurants.models;

import com.c24_39_t_webapp.restaurants.models.Pedido;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "detalles_pedido")
public class DetallesPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dtp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dtp_pedido_id", nullable = false)
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dtp_producto_id", nullable = false)
    private Producto producto;

    @Column(name = "dtp_cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "dtp_subtotal", nullable = false)
    private Double subtotal;
}