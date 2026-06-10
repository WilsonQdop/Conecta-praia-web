package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewProviderRepository providerRepository;
    private final ReviewServiceRepository serviceRepository;
    private final ReviewEventRepository eventRepository;
    private final ReviewEntrepreneurRepository entrepreneurRepository;
    private final AuthUtil authUtil;

    public ReviewService(ReviewProviderRepository providerRepository,
                         ReviewServiceRepository serviceRepository,
                         ReviewEventRepository eventRepository,
                         ReviewEntrepreneurRepository entrepreneurRepository,
                         AuthUtil authUtil) {
        this.providerRepository = providerRepository;
        this.serviceRepository = serviceRepository;
        this.eventRepository = eventRepository;
        this.entrepreneurRepository = entrepreneurRepository;
        this.authUtil = authUtil;
    }

    // Método para avaliar um serviço
    public void reviewService(UUID postId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        PostsService post = this.postServiceRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        ReviewService review = new ReviewService();
        review.setTourist(tourist);
        review.setPostsService(post);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        serviceRepository.save(review);
    }

    // Método para avaliar um empreendedor
    public void reviewEntrepreneur(UUID entrepreneurId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        Entrepreneur emp = this.entrepreneurRepository.findById(entrepreneurId)
                .orElseThrow(() -> new EntityNotFoundException("Empreendedor não encontrado"));

        ReviewEntrepreneur review = new ReviewEntrepreneur();
        review.setTourist(tourist);
        review.setEntrepreneur(emp);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        entrepreneurRepository.save(review);
    }
}
