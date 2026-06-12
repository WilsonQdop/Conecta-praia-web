package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import br.com.uninassau.LEI.ConectaPraia.dto.EntrepreneurResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.TouristResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.EntrepreneurRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostEventRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.TouristRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import br.com.uninassau.LEI.ConectaPraia.utils.ConvertDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AdminService {

    private final PostServiceRepository postServiceRepository;
    private final PostEventRepository postEventRepository;
    private final TouristRepository touristRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final AuthUtil authUtil;
    private final ConvertDTO convertDTO;

    public AdminService(PostServiceRepository postServiceRepository, PostEventRepository postEventRepository,
                        TouristRepository touristRepository, EntrepreneurRepository entrepreneurRepository,
                        AuthUtil authUtil, ConvertDTO convertDTO) {
        this.postServiceRepository = postServiceRepository;
        this.postEventRepository = postEventRepository;
        this.touristRepository = touristRepository;
        this.entrepreneurRepository = entrepreneurRepository;
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
    public Stream<TouristResponseDTO> getAllTourist () {
        List<Tourist> touristList = this.touristRepository.findAll();
        return touristList.stream()
                .map(t -> new TouristResponseDTO(t.getId(),
                        t.getName(), t.getEmail(),
                        t.getPhone(), t.getRole(),
                        t.getCpf(), t.getProfilePictureUrl()));
    }

    public Stream<EntrepreneurResponseDTO> getAllEntrepreneur () {
        List<Entrepreneur> entrepreneurList = this.entrepreneurRepository.findAll();
        return entrepreneurList.stream()
                .map(e -> new EntrepreneurResponseDTO(e.getId(),
                e.getName(), e.getEmail(),
                e.getPhone(), e.getRole(),
                e.getCpf(), e.getProfilePictureUrl()));
    }

}
