package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostEventRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.PostEventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/postEvent")
public class PostEventController {

    private final PostEventService postEventService;

    public PostEventController(PostEventService postEventService) {
        this.postEventService = postEventService;
    }

    @PreAuthorize("hasRole('EMPREENDEDOR')")
    @PostMapping("/create")
    public ResponseEntity<CreatePostEventResponseDTO> createEvent(@RequestBody CreatePostEventRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postEventService.createPostEvent(request));
    }
}
