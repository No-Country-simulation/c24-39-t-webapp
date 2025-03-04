package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.OrderUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;
import com.c24_39_t_webapp.restaurants.repository.OrderRepository;
import com.c24_39_t_webapp.restaurants.services.IOrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/order")
@AllArgsConstructor
public class OrderController {

    private IOrderService orderService;
    private OrderRepository orderRepository;

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

    /**
     * Endpoint to retrieve a single {@link ResponseEntity} Order object from the system.
     * Delegates the retrieval logic to {@link IOrderService#findOrderById(Long)}.
     *
     * @param ord_id The ID of the order to retrieve.
     * @return The {@code OrderResponseDto} object representing the retrieved order.
     */
    @GetMapping(value = "/{ord_id}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long ord_id) {
        log.info("Solicitud recibida para obtener el pedido con id: {}", ord_id);
        OrderResponseDto order = orderService.findOrderById(ord_id);
        log.info("Pedido recuperado exitosamente con los siguientes datos: {}", order);
        return ResponseEntity.ok(order);
    }

    /**
     * Endpoint to update an existing {@link ResponseEntity} Order object in the system.
     * Delegates the update logic to {@link IOrderService#updateOrder(Long, OrderUpdateRequestDto)}.
     *
     * @param ord_id          The ID of the order to update.
     * @param updateRequestDto The {@code OrderUpdateRequestDto} object containing the updated order details.
     * @return The {@code OrderResponseDto} object representing the updated order.
     */
    @PatchMapping(value = "/{ord_id}")
    public ResponseEntity<OrderResponseDto> updateOrder(@PathVariable Long ord_id, @RequestBody OrderUpdateRequestDto updateRequestDto) {
        log.info("Solicitud recibida para actualizar el pedido con id: {} con los siguientes datos: {}", ord_id, updateRequestDto);
        OrderResponseDto order = orderService.updateOrder(ord_id, updateRequestDto);
        log.info("Pedido actualizado exitosamente con los siguientes datos: {}", order);
        return ResponseEntity.ok(order);
    }

    /**
     * Endpoint to delete an existing {@link ResponseEntity} Order object in the system.
     * Delegates the delete logic to {@link IOrderService#deleteOrder(Order)}.
     *
     * @param ord_id The ID of the order to delete.
     */
    @DeleteMapping(value = "/{ord_id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long ord_id) {
        log.info("Solicitud recibida para eliminar el pedido con id: {} junto a sus detalles de pedido", ord_id);
        orderService.deleteOrder(ord_id); // Llama al servicio
        log.info("Pedido con id {} eliminado exitosamente junto a los detalles de pedido.", ord_id);
        return ResponseEntity.noContent().build();
    }
}