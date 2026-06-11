package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Registered;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.RegisteredRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import br.com.uninassau.LEI.ConectaPraia.utils.ConvertDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegisteredService {

    private final RegisteredRepository registeredRepository;
    private final AuthUtil authUtil;
    private final ConvertDTO convertDTO;

    public RegisteredService(RegisteredRepository registeredRepository, AuthUtil authUtil, ConvertDTO convertDTO) {
        this.registeredRepository = registeredRepository;
        this.authUtil = authUtil;
        this.convertDTO = convertDTO;
    }


    public List<PostEventResponseDTO> findAllRegisteredEventsForTourist() {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();

        List<Registered> registros = this.registeredRepository
                .findByTouristAndPostEventIsNotNullOrderByRegisteredAtDesc(tourist);

        return registros.stream()
                .map(Registered::getPostEvent)
                .map(this.convertDTO::convertToEventResponseDTO)
                .collect(Collectors.toList());
    }

    public List<PostServiceResponseDTO> findAllRegisteredServicesForTourist() {
        Tourist tourist = (Tourist) this.authUtil.getUserLoggedIn();

        List<Registered> registros = this.registeredRepository
                .findByTouristAndPostServiceIsNotNullOrderByRegisteredAtDesc(tourist);

        return registros.stream()
                .map(Registered::getPostService)
                .map(this.convertDTO::convertToResponseDTO)
                .collect(Collectors.toList());
    }
}
