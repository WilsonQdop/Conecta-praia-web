package br.com.uninassau.LEI.ConectaPraia.service;


import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

            return "http://localhost:8080/Uploads_imagens/" + fileName;

        }  catch (Exception e) {
        throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage());
        }
    }

    @Transactional
    public String savedImagePosts (MultipartFile file, UUID postId, Entrepreneur entrepreneur) {
        try {
            System.out.println("[UPLOAD] postId recebido: " + postId);
            System.out.println("[UPLOAD] Arquivo: " + file.getOriginalFilename());
            System.out.println("[UPLOAD] Entrepreneur: " + entrepreneur.getEmail());

            PostsService postsService = postServiceRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post não encontrado"));

            System.out.println("[UPLOAD] Post encontrado: " + postsService.getTitle());

            if (!postsService.getEntrepreneur().getId().equals(entrepreneur.getId())) {
                throw new RuntimeException("Usuário logado não pode alterar esse post");
            }

            if (!Files.exists(fileRoot)) {
                Files.createDirectories(fileRoot);
                System.out.println("[UPLOAD] Diretório criado: " + fileRoot);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetPath = fileRoot.resolve(fileName);

            System.out.println("[UPLOAD] Salvando em: " + targetPath);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = targetPath.toString();
            System.out.println("[UPLOAD] ✅ Arquivo salvo. URL: " + imageUrl);

            postsService.setImageUrl(imageUrl);
            postServiceRepository.save(postsService);

            System.out.println("[UPLOAD] ✅ Post atualizado com imagem");
            return imageUrl;

        } catch (Exception e) {
            System.out.println("[UPLOAD] ❌ ERRO: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage());
        }
    }

}