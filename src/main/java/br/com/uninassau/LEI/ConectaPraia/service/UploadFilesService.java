package br.com.uninassau.LEI.ConectaPraia.service;


import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UploadFilesService {

    private final Path fileRoot = Paths.get("Uploads_imagens");
    private final PostServiceRepository postServiceRepository;

    public UploadFilesService(PostServiceRepository postServiceRepository) {
        this.postServiceRepository = postServiceRepository;
    }

    public String saveImagesFiles(MultipartFile file) {
        try {
            if(!Files.exists(fileRoot)) {
                Files.createDirectories(fileRoot);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetPath = fileRoot.resolve(fileName);

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return targetPath.toString();

        }  catch (Exception e) {
        throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage());
        }
    }

    public String savedImagePosts (MultipartFile file, UUID postId, Entrepreneur entrepreneur) {
        try {
            PostsService postsService = postServiceRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post não encontrado"));

            if (!postsService.getEntrepreneur().getId().equals(entrepreneur.getId())) {
                throw new RuntimeException("Usuário logado não pode alterar esse post");
            }

            if (!Files.exists(fileRoot)) {
                Files.createDirectories(fileRoot);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetPath = fileRoot.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = targetPath.toString();

            postsService.setImageUrl(imageUrl);
            postServiceRepository.save(postsService);

            return imageUrl;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage());
        }
    }
}