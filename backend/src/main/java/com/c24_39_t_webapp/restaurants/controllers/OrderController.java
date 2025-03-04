package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.ProductRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ProductResponseDto;
import com.c24_39_t_webapp.restaurants.services.IOrderService;
import com.c24_39_t_webapp.restaurants.services.IProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private IOrderService orderService;

//    public ProductController(IProductService productService) {
//        this.productService = productService;
//    }

    /**
     * Endpoint to add a new {@link ResponseEntity} Order object to the system.
     * Delegates the addition logic to {@link IOrderService#addOrder(OrderRequestDto, String)}.
     *
     * @param requestDto The {@code OrderRequestDto} object to add.
     * @param email      The email of the user adding the order.
     * @return The {@code OrderResponseDto} object representing the added order.
     */
    @PostMapping
    public ResponseEntity<OrderResponseDto> addOrder(@RequestBody OrderRequestDto requestDto, @RequestParam String email) {
        log.info("Recibida solicitud para añadir un pedido con los siguientes datos: {}", requestDto);
        OrderResponseDto responseDto = orderService.addOrder(requestDto, email);
        log.info("Pedido agregado exitosamente con los siguientes datos: {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }
}