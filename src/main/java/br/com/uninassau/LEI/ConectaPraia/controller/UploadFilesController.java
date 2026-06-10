package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.User;
import br.com.uninassau.LEI.ConectaPraia.repositories.UserRepository;
import br.com.uninassau.LEI.ConectaPraia.service.UploadFilesService;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class UploadFilesController {

    private final UploadFilesService uploadFilesService;
    private final AuthUtil authUtil;
    public UploadFilesController(UploadFilesService uploadFilesService, AuthUtil authUtil) {
        this.uploadFilesService = uploadFilesService;
        this.authUtil = authUtil;
    }

    @PreAuthorize("hasRole('EMPREENDEDOR')")
    @PostMapping(value = "/upload/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadPosts(@PathVariable UUID postId, @RequestPart("image") MultipartFile image) {

        Entrepreneur entrepreneur = (Entrepreneur) authUtil.getUserLoggedIn();
        String imageUrl = uploadFilesService.savedImagePosts(image, postId, entrepreneur);

        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
