package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.dto.CreatePostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.CreatePostServiceRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.PostServiceService;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping("/my-services")
    @PreAuthorize("hasRole('EMPREENDEDOR')")
    public ResponseEntity<List<PostServiceResponseDTO>> getMyServices() {
        System.out.println("[CONTROLLER] GET /postService/my-services");

        List<PostServiceResponseDTO> services = this.postServiceService.findAllByEntrepreneur();

        return ResponseEntity.ok(services);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable String id) {
        postServiceService.deleteById(id);
        return ResponseEntity.noContent().build();
}




}
