package com.c24_39_t_webapp.restaurants.services.impl;

import com.c24_39_t_webapp.restaurants.dtos.request.AddReviewDto;
import com.c24_39_t_webapp.restaurants.dtos.request.UpdateReviewDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ReviewResponseDto;
import com.c24_39_t_webapp.restaurants.exception.UnauthorizedException;
import com.c24_39_t_webapp.restaurants.exception.user_implementations.ResourceNotFoundException;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.models.Review;
import com.c24_39_t_webapp.restaurants.models.UserEntity;
import com.c24_39_t_webapp.restaurants.repository.RestaurantRepository;
import com.c24_39_t_webapp.restaurants.repository.ReviewRepository;
import com.c24_39_t_webapp.restaurants.repository.UserRepository;
import com.c24_39_t_webapp.restaurants.services.IReviewService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
@Transactional
public class ReviewServiceImpl implements IReviewService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public ReviewResponseDto addReview(AddReviewDto reviewDto, UserDetailsImpl userDetails) {
        log.info("verificando permisos para agregar una review");

        UserEntity user =
                userRepository.findById(userDetails.getId()).orElseThrow(() -> new ResourceNotFoundException(
                        "No se encontró el usuario buscado"));

        Restaurant restaurant = restaurantRepository.findById(reviewDto.restaurantId()).orElseThrow(() -> new ResourceNotFoundException(
                "No se encontró el restaurante buscado"));

        Review review = new Review();
        review.setComments(reviewDto.comments());
        review.setScore(reviewDto.score());
        review.setRestaurant(restaurant);
        review.setUserEntity(user);

        reviewRepository.save(review);
        return new ReviewResponseDto(review);
    }

    @Override
    public List<ReviewResponseDto> getAllRestaurantReviews(Restaurant restaurant) {
        List<Review> rewiewList = reviewRepository.findByRestaurant(restaurant);

        return rewiewList.stream().map(
                review -> new ReviewResponseDto(
                        review.getId(),
                        review.getRestaurant(),
                        review.getUserEntity(),
                        review.getScore(),
                        review.getComments(),
                        review.getCreatedAt())
        ).collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDto getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Reseña no " +
                        "encontrada!"));
        return new ReviewResponseDto(review);
    }

    @Override
    public ReviewResponseDto updateReview(UpdateReviewDto updateReviewDto, UserDetailsImpl userDetails) {
        Review review =
                reviewRepository.findById(updateReviewDto.reviewId()).orElseThrow(() -> new ResourceNotFoundException(
                        "Reseña no encontrada"));
        Optional.ofNullable(updateReviewDto.comments())
                .ifPresent(review::setComments);
        Optional.ofNullable(updateReviewDto.score())
                .ifPresent(review::setScore);
        reviewRepository.save(review);
        return new ReviewResponseDto(review);
    }

    @Override
    public void deleteReview(Long id, UserDetailsImpl userDetails) {
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("No se encontro la reseña"));
        if (!review.getUserEntity().getId().equals(userDetails.getId())) {
            throw new UnauthorizedException("No esta autorizado para eliminar esta reseña");
        }
        reviewRepository.deleteById(id);
    }

    private static void validateUserPermissions(UserEntity user, Restaurant restaurant) {
        if (!restaurant.getUserEntity().getId().equals(user.getId())) {
            throw new UnauthorizedException("El usuario no tiene permisos para el cambio");
        }
    }


}
