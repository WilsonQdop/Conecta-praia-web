package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostEventRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostEventRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PostEventService {

    private final PostEventRepository postEventRepository;
    private final AuthUtil authUtil;

    public PostEventService(PostEventRepository postEventRepository, AuthUtil authUtil) {
        this.postEventRepository = postEventRepository;
        this.authUtil = authUtil;
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
                saved.getTitle(), saved.getEventType(), saved.getLocation(),
                saved.getValue(), saved.getValueDescription(), saved.getImageUrl(),
                saved.getDescription(), saved.getCreatedAt(), saved.getDateHour());
    }
}
