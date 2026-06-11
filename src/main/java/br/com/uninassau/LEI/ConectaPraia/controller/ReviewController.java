package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.request.ReviewRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/reviews")
@PreAuthorize("hasRole('TURISTA')")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/services/{postId}")
    public ResponseEntity<Void> reviewService(@PathVariable UUID postId, @RequestBody ReviewRequestDTO dto) {
        this.reviewService.reviewService(postId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/events/{eventId}")
    public ResponseEntity<Void> reviewEvent(@PathVariable UUID eventId, @RequestBody ReviewRequestDTO dto) {
        this.reviewService.reviewEvent(eventId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/providers/{providerId}")
    public ResponseEntity<Void> reviewProvider(@PathVariable UUID providerId, @RequestBody ReviewRequestDTO dto) {
        this.reviewService.reviewProvider(providerId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/entrepreneurs/{entrepreneurId}")
    public ResponseEntity<Void> reviewEntrepreneur(@PathVariable UUID entrepreneurId, @RequestBody ReviewRequestDTO dto) {
        this.reviewService.reviewEntrepreneur(entrepreneurId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
