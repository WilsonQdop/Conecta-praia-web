package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostServiceRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.PostServiceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/postService")
public class PostServiceController {
    private final PostServiceService postServiceService;

    public PostServiceController(PostServiceService postServiceService) {
        this.postServiceService = postServiceService;
    }

    @PreAuthorize("hasRole('EMPREENDEDOR')")
    @PostMapping("/create")
    public ResponseEntity<CreatePostServiceResponseDTO> createPost(@RequestBody CreatePostServiceRequestDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED).body(postServiceService.createPostService(request));
    }
}
