package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.services.IOrderService;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    /**
     * Endpoint to add a new {@link ResponseEntity} Order object to the system.
     * Delegates the addition logic to {@link IOrderService#addOrder(OrderRequestDto, String)}.
     *
     * @param requestDto The {@code OrderRequestDto} object to add.
     * @param email      The email of the user adding the order.
     * @return The {@code OrderResponseDto} object representing the added order.
     */
    @PostMapping
    @Transactional
    public ResponseEntity<OrderResponseDto> addOrder(@RequestBody OrderRequestDto requestDto, @RequestParam String email) {
        log.info("Recibida solicitud para añadir un pedido con los siguientes datos: {}", requestDto);
        OrderResponseDto responseDto = orderService.addOrder(requestDto, email);
        log.info("Pedido agregado exitosamente con los siguientes datos: {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }
    /**
     * Endpoint to retrieve all {@link ResponseEntity} Order objects from the system.
     * Delegates the retrieval logic to {@link IOrderService#findAllOrders()}.
     *
     * @return A list of {@code OrderResponseDto} objects representing all orders in the system.
     */
    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        log.info("Solicitud recibida para obtener todos los pedidos.");
        List<OrderResponseDto> orders = orderService.findAllOrders();
        log.info("Se recuperaron {} pedidos exitosamente.", orders.size());
        return ResponseEntity.ok(orders);
    }

    @GetMapping(value = "/{ord_Id}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long ord_Id) {
        log.info("Solicitud recibida para obtener el pedido con id: {}", ord_Id);
        OrderResponseDto order = orderService.findOrderById(ord_Id);
        log.info("Pedido recuperado exitosamente con los siguientes datos: {}", order);
        return ResponseEntity.ok(order);
    }
}