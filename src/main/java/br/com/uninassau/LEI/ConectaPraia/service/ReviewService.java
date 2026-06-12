package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.*;
import br.com.uninassau.LEI.ConectaPraia.dto.ReviewResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.ReviewRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.*;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.util.List;
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
    public List<ReviewResponseDTO> getServiceReviews(UUID serviceId) {
    // Busca o serviço pelo ID
    PostsService service = postServiceRepository.findById(serviceId)
        .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID: " + serviceId));
    
    // Busca todas as avaliações do serviço - USA ReviewServices (entidade)
    List<ReviewServices> reviews = reviewServiceRepository.findByPostsService(service);
    
    // Converte para DTO
    return reviews.stream()
        .map(review -> new ReviewResponseDTO(
            review.getId().toString(),
            review.getTourist().getName(),
            review.getRating(),
            review.getComment(),
            review.getCreatedAt().toString()
        ))
        .collect(Collectors.toList());
}

public List<ReviewResponseDTO> getEventReviews(UUID eventId) {
    // Busca o evento pelo ID
    PostsEvent event = postEventRepository.findById(eventId)
        .orElseThrow(() -> new RuntimeException("Evento não encontrado com ID: " + eventId));
    
    // Busca todas as avaliações do evento - USA ReviewEvent (entidade)
    List<ReviewEvent> reviews = reviewEventRepository.findByPostsEvent(event);
    
    // Converte para DTO
    return reviews.stream()
        .map(review -> new ReviewResponseDTO(
            review.getId().toString(),
            review.getTourist().getName(),
            review.getRating(),
            review.getComment(),
            review.getCreatedAt().toString()
        ))
        .collect(Collectors.toList());
}
}