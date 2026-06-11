package br.com.uninassau.LEI.ConectaPraia.utils;

import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class ConvertDTO {

    public PostServiceResponseDTO convertToResponseDTO(PostsService postsService) {
        return new PostServiceResponseDTO(
                postsService.getId(),
                postsService.getTitle(),
                postsService.getServiceType(),
                postsService.getLocation(),
                postsService.getValue(),
                postsService.getValueDescription(),
                postsService.getImageUrl(),
                postsService.getDescription(),
                postsService.getCreatedAt(),
                postsService.getDateHour(),
                postsService.getEntrepreneur().getName(),
                postsService.getEntrepreneur().getId()
        );
    }


    public PostEventResponseDTO convertToEventResponseDTO(PostsEvent postsEvent) {
        return new PostEventResponseDTO(
                postsEvent.getId(),
                postsEvent.getTitle(),
                postsEvent.getEventType(),
                postsEvent.getLocation(),
                postsEvent.getValue(),
                postsEvent.getValueDescription(),
                postsEvent.getImageUrl(),
                postsEvent.getDescription(),
                postsEvent.getCreatedAt(),
                postsEvent.getDateHour(),
                postsEvent.getEntrepreneur().getName(),
                postsEvent.getEntrepreneur().getId()
        );
    }


}
