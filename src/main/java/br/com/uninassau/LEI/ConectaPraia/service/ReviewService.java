package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.*;
import br.com.uninassau.LEI.ConectaPraia.dto.request.ReviewRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.*;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewProviderRepository reviewProviderRepository;
    private final ReviewServiceRepository reviewServiceRepository;
    private final ReviewEventRepository reviewEventRepository;
    private final ReviewEntrepreneurRepository reviewEntrepreneurRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final PostServiceRepository postServiceRepository;
    private final PostEventRepository postEventRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final AuthUtil authUtil;

    public ReviewService(ReviewProviderRepository reviewProviderRepository, ReviewServiceRepository reviewServiceRepository,
                         ReviewEventRepository reviewEventRepository, ReviewEntrepreneurRepository
                                 reviewEntrepreneurRepository, EntrepreneurRepository entrepreneurRepository,
                         PostServiceRepository postServiceRepository, PostEventRepository postEventRepository, ServiceProviderRepository serviceProviderRepository, AuthUtil authUtil) {
        this.reviewProviderRepository = reviewProviderRepository;
        this.reviewServiceRepository = reviewServiceRepository;
        this.reviewEventRepository = reviewEventRepository;
        this.reviewEntrepreneurRepository = reviewEntrepreneurRepository;

        this.entrepreneurRepository = entrepreneurRepository;
        this.postServiceRepository = postServiceRepository;
        this.postEventRepository = postEventRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.authUtil = authUtil;
    }

    public void reviewService(UUID postId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        PostsService post = this.postServiceRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        ReviewServices review = new ReviewServices();
        review.setTourist(tourist);
        review.setPostsService(post);
        review.setRating(dto.rating());
        review.setComment(dto.comment());
        review.setCreatedAt(LocalDateTime.now());

        this.reviewServiceRepository.save(review);
    }

    public void reviewEvent(UUID postId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        PostsEvent event = this.postEventRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        ReviewEvent review = new ReviewEvent();
        review.setTourist(tourist);
        review.setPostsEvent(event);
        review.setRating(dto.rating());
        review.setComment(dto.comment());
        review.setCreatedAt(LocalDateTime.now());

        this.reviewEventRepository.save(review);
    }

    public void reviewProvider(UUID postId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        ServiceProvider provider = this.serviceProviderRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        ReviewProvider review = new ReviewProvider();
        review.setTourist(tourist);
        review.setServiceProvider(provider);
        review.setRating(dto.rating());
        review.setComment(dto.comment());
        review.setCreatedAt(LocalDateTime.now());

        this.reviewProviderRepository.save(review);
    }

    // Método para avaliar um empreendedor
    public void reviewEntrepreneur(UUID entrepreneurId, ReviewRequestDTO dto) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();
        Entrepreneur emp = this.entrepreneurRepository.findById(entrepreneurId)
                .orElseThrow(() -> new EntityNotFoundException("Empreendedor não encontrado"));

        ReviewEntrepreneur review = new ReviewEntrepreneur();
        review.setTourist(tourist);
        review.setEntrepreneur(emp);
        review.setRating(dto.rating());
        review.setComment(dto.comment());
        review.setCreatedAt(LocalDateTime.now());

        this.reviewEntrepreneurRepository.save(review);
    }
}
