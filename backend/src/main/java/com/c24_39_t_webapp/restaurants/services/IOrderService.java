package com.c24_39_t_webapp.restaurants.services;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.OrderUpdateRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;

import java.util.List;

public interface IOrderService {
    OrderResponseDto addOrder(OrderRequestDto orderRequestDto, String username);

    List<OrderResponseDto> findAllOrders();

    OrderResponseDto findOrderById(Long ord_id);

    OrderResponseDto updateOrder(Long ord_id, OrderUpdateRequestDto updateOrderDto);

    void deleteOrder(Long ord_id);

 }
