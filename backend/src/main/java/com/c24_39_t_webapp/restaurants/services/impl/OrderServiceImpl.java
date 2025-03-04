package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.OrderDetailsRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.request.OrderRequestDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderDetailsResponseDto;
import com.c24_39_t_webapp.restaurants.dtos.response.OrderResponseDto;
import com.c24_39_t_webapp.restaurants.exception.CategoryNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.ProductNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.RestaurantNotFoundException;
import com.c24_39_t_webapp.restaurants.exception.UserNotFoundException;
import com.c24_39_t_webapp.restaurants.models.*;
import com.c24_39_t_webapp.restaurants.repository.*;
import com.c24_39_t_webapp.restaurants.services.IOrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final ProductRepository productRepository;
    private final OrderDetailsRepository orderDetailsRepository;

    //    @PreAuthorize("hasAuthority('user')")
    @Override
    @Transactional
    public OrderResponseDto addOrder(OrderRequestDto orderRequestDto, String email) {
        log.info("Intentando crear un pedido para el usuario con email: {}", email);

        // Validaciones básicas
        validateOrderRequest(orderRequestDto);

        // Buscar entidades relacionadas
        Restaurant restaurant = restaurantRepository.findById(orderRequestDto.restaurantId())
                .orElseThrow(() -> new RestaurantNotFoundException("No se ha encontrado el restaurante"));
        UserEntity client = userRepository.findById(orderRequestDto.clientId())
                .orElseThrow(() -> new UserNotFoundException("No se ha encontrado el usuario"));

        if(!client.getEmail().equals(email)){
            throw new IllegalArgumentException("El usuario no coincide con el email proporcionado");
        }
        Order order = new Order();
        order.setClientId(client);
        order.setRestaurantId(restaurant);
        order.setEstate(OrderState.pendiente);
        order.setTotal(orderRequestDto.total());
        order.setComments(orderRequestDto.comments());
        order = orderRepository.save(order);

        List<OrderDetails> details = new ArrayList<>();

        for (OrderDetailsRequestDto detailDto : orderRequestDto.details()) {
            Product product = productRepository.findById(detailDto.productId())
                    .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado: " + detailDto.productId()));

            OrderDetails detail = new OrderDetails();
            detail.setOrder(order);
            detail.setProduct(product);
            detail.setQuantity(detailDto.quantity());
            detail.setSubtotal(detailDto.subtotal());
            details.add(detail);
        }
        orderDetailsRepository.saveAll(details);
        log.info("Pedido creado con éxito");

        List<OrderDetailsResponseDto> detailsResponse = details.stream()
                .map(detail -> new OrderDetailsResponseDto(
                        detail.getOdt_id(),
                        detail.getProduct().getPrd_id(),
                        detail.getQuantity(),
                        detail.getSubtotal()
                ))
                .collect(Collectors.toList());
        return new OrderResponseDto(
                order.getOrd_id(),
                order.getClientId().getId(),
                order.getRestaurantId().getRst_id(),
                order.getEstate(),
                order.getTotal(),
                order.getComments(),
                detailsResponse
        );
    }

    private void validateOrderRequest(OrderRequestDto dto) {
        if (dto.restaurantId() == null || dto.restaurantId() <= 0) {
            throw new IllegalArgumentException("El ID del restaurante no es válido");
        }
        if (dto.clientId() == null || dto.clientId() <= 0) {
            throw new IllegalArgumentException("El ID del cliente no es válido");
        }
        if (dto.details() == null || dto.details().isEmpty()) {
            throw new IllegalArgumentException("El pedido debe contener al menos un detalle de pedido");
        }
        // Validación adicional: verificar que el total coincida con la suma de subtotales
        double calculatedTotal = dto.details().stream()
                .mapToDouble(OrderDetailsRequestDto::subtotal)
                .sum();
        if (!dto.total().equals(calculatedTotal)) {
            throw new IllegalArgumentException("El total del pedido no coincide con la suma de los subtotales");
        }
    }
}
