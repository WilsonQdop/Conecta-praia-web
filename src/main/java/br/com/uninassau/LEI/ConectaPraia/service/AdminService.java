package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostEventRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import br.com.uninassau.LEI.ConectaPraia.utils.ConvertDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final PostServiceRepository postServiceRepository;
    private final PostEventRepository postEventRepository;
    private final AuthUtil authUtil;
    private final ConvertDTO convertDTO;

    public AdminService(PostServiceRepository postServiceRepository, PostEventRepository postEventRepository,
                        AuthUtil authUtil, ConvertDTO convertDTO) {
        this.postServiceRepository = postServiceRepository;
        this.postEventRepository = postEventRepository;
        this.authUtil = authUtil;
        this.convertDTO = convertDTO;
    }

    public List<PostServiceResponseDTO> findAll() {
        List<PostsService> posts = this.postServiceRepository.findAllOrderByCreatedAtDesc();

        return posts.stream()
                .map(this.convertDTO::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<PostEventResponseDTO> findAllEvents() {
        List<PostsEvent> posts = this.postEventRepository.findAllOrderByCreatedAtDesc();

        return posts.stream()
                .map(this.convertDTO::convertToEventResponseDTO)
                .collect(Collectors.toList());
    }

}
