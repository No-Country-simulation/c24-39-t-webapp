package com.c24_39_t_webapp.restaurants.controllers;

import com.c24_39_t_webapp.restaurants.dtos.request.AddReviewDto;
import com.c24_39_t_webapp.restaurants.dtos.request.UpdateReviewDto;
import com.c24_39_t_webapp.restaurants.dtos.response.ReviewResponseDto;
import com.c24_39_t_webapp.restaurants.models.Restaurant;
import com.c24_39_t_webapp.restaurants.services.IReviewService;
import com.c24_39_t_webapp.restaurants.services.impl.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {

    private final IReviewService iReviewService;

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody @Valid final AddReviewDto reviewDto,
                                       @AuthenticationPrincipal final UserDetailsImpl userDetails) {
        ReviewResponseDto reviewResponseDto = iReviewService.addReview(reviewDto, userDetails);
        return ResponseEntity.ok(reviewResponseDto);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<?> allRestaurantReviews(@RequestBody final Restaurant restaurant) {
        List<ReviewResponseDto> reviewList = iReviewService.getAllRestaurantReviews(restaurant);
        return ResponseEntity.ok(reviewList);
    }

    @GetMapping("/id")
    public ResponseEntity<?> getReviewById(@RequestBody final Long id) {
        ReviewResponseDto reviewResponseDto = iReviewService.getReviewById(id);
        return ResponseEntity.ok(reviewResponseDto);
    }

    @PutMapping()
    public ResponseEntity<?> updateReview(@RequestBody final UpdateReviewDto updateReviewDto,
                 @AuthenticationPrincipal UserDetailsImpl userDetails) {
        ReviewResponseDto reviewResponseDto = iReviewService.updateReview(updateReviewDto, userDetails);
        return ResponseEntity.ok(reviewResponseDto);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteReview(@RequestBody final Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        iReviewService.deleteReview(id, userDetails);
        return ResponseEntity.ok().build();
    }
}
