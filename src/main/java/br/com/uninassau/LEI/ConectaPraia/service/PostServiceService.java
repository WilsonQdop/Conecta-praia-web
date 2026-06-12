package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostServiceRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import br.com.uninassau.LEI.ConectaPraia.utils.ConvertDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceService {

    private final PostServiceRepository postServiceRepository;
    private final AuthUtil authUtil;
    private final ConvertDTO convertDTO;


    public PostServiceService(PostServiceRepository postServiceRepository, AuthUtil authUtil, ConvertDTO convertDTO) {
        this.postServiceRepository = postServiceRepository;
        this.authUtil = authUtil;
        this.convertDTO = convertDTO;
    }

    public CreatePostServiceResponseDTO createPostService(CreatePostServiceRequestDTO request) {
        Entrepreneur entrepreneur = (Entrepreneur) this.authUtil.getUserLoggedIn();

        PostsService postsService = new PostsService();

        postsService.setTitle(request.title());
        postsService.setLocation(request.location());
        postsService.setValue(request.value());
        postsService.setDescription(request.description());
        postsService.setValueDescription(request.valueDescription());
        postsService.setImageUrl(request.imageUrl());
        postsService.setServiceType(request.serviceType());
        postsService.setCreatedAt(LocalDateTime.now());
        postsService.setDateHour(LocalDateTime.now());
        postsService.setImageUrl(request.imageUrl());
        postsService.setEntrepreneur(entrepreneur);

        PostsService saved = this.postServiceRepository.save(postsService);

        return new CreatePostServiceResponseDTO(
                saved.getId(),
                saved.getTitle(), saved.getServiceType(), saved.getLocation(),
                saved.getValue(), saved.getValueDescription(), saved.getImageUrl(),
                saved.getDescription(), saved.getCreatedAt(), saved.getDateHour());
    }

    public List<PostServiceResponseDTO> findAllByEntrepreneur() {
        Entrepreneur entrepreneur = (Entrepreneur) this.authUtil.getUserLoggedIn();

        List<PostsService> posts = this.postServiceRepository.findAllByEntrepreneurOrderByCreatedAtDesc(entrepreneur);

        return posts.stream()
                .map(this.convertDTO::convertToResponseDTO)
                .collect(Collectors.toList());
    }




}
