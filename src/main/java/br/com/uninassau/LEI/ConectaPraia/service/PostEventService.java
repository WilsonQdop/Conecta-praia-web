package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostEventRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.UpdateProfileRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostEventRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import br.com.uninassau.LEI.ConectaPraia.utils.ConvertDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostEventService {

    private final PostEventRepository postEventRepository;
    private final AuthUtil authUtil;
    private final ConvertDTO convertDTO;

    public PostEventService(PostEventRepository postEventRepository, AuthUtil authUtil, ConvertDTO convertDTO) {
        this.postEventRepository = postEventRepository;
        this.authUtil = authUtil;
        this.convertDTO = convertDTO;
    }

    public CreatePostEventResponseDTO createPostEvent(CreatePostEventRequestDTO request) {
        Entrepreneur entrepreneur = (Entrepreneur) this.authUtil.getUserLoggedIn();

        PostsEvent postsEvent = new PostsEvent();

        postsEvent.setTitle(request.title());
        postsEvent.setLocation(request.location());
        postsEvent.setValue(request.value());
        postsEvent.setDescription(request.description());
        postsEvent.setValueDescription(request.valueDescription());
        postsEvent.setImageUrl(request.imageUrl());
        postsEvent.setEventType(request.eventType());
        postsEvent.setCreatedAt(LocalDateTime.now());
        postsEvent.setDateHour(LocalDateTime.now());
        postsEvent.setImageUrl(request.imageUrl());
        postsEvent.setEntrepreneur(entrepreneur);

        PostsEvent saved = this.postEventRepository.save(postsEvent);

        return new CreatePostEventResponseDTO(
                saved.getId(),
                saved.getTitle(), saved.getEventType(), saved.getLocation(),
                saved.getValue(), saved.getValueDescription(), saved.getImageUrl(),
                saved.getDescription(), saved.getCreatedAt(), saved.getDateHour());
    }

    public List<PostEventResponseDTO> findAllEventsByEntrepreneur() {
        Entrepreneur entrepreneur = (Entrepreneur) this.authUtil.getUserLoggedIn();

        List<PostsEvent> posts = this.postEventRepository.findAllByEntrepreneurOrderByCreatedAtDesc(entrepreneur);

        return posts.stream()
                .map(this.convertDTO::convertToEventResponseDTO)
                .collect(Collectors.toList());
    }



}
