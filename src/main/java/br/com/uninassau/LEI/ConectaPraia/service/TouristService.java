package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.*;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.TouristSubscribeResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostEventRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.PostServiceRepository;
import br.com.uninassau.LEI.ConectaPraia.repositories.RegisteredRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TouristService {

    private final PostServiceRepository postServiceRepository;
    private final PostEventRepository postEventRepository;
    private final AuthUtil authUtil;
    private final RegisteredRepository registeredRepository;

    public TouristService( PostServiceRepository postServiceRepository,
                          PostEventRepository postEventRepository, AuthUtil authUtil, RegisteredRepository registeredRepository) {
        this.postServiceRepository = postServiceRepository;
        this.postEventRepository = postEventRepository;
        this.authUtil = authUtil;
        this.registeredRepository = registeredRepository;
    }

    public TouristSubscribeResponseDTO subscribeToService(UUID serviceId) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();

        PostsService service = this.postServiceRepository.findById(serviceId)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        Registered subscription = new Registered();
        subscription.setTourist(tourist);
        subscription.setPostService(service);
        subscription.setRegisteredAt(LocalDateTime.now());

        this.registeredRepository.save(subscription);

        return new TouristSubscribeResponseDTO(tourist.getName(), service.getTitle());
    }

    public TouristSubscribeResponseDTO subscribeToEvent(UUID eventId) {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();

        PostsEvent event = this.postEventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Evento não encontrado"));

        Registered subscription = new Registered();
        subscription.setTourist(tourist);
        subscription.setPostEvent(event);
        subscription.setRegisteredAt(LocalDateTime.now());

        this.registeredRepository.save(subscription);

        return new TouristSubscribeResponseDTO(tourist.getName(), event.getTitle());
    }

}
