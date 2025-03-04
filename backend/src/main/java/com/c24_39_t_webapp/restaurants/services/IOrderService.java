package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;

import java.util.List;

public interface IOrderService {
    OrderResponseDto addOrder(OrderRequestDto orderRequestDto, String username);

    List<OrderResponseDto> findAllOrders();
//
//    ProductResponseDto findOrderById(Long ord_id);
//
//    ProductResponseDto updateOrder(Long ord_id, ProductOrderDto updateOrderDto); ¿¿¿???
//
//    void deleteOrder(Long ord_id);

 }
