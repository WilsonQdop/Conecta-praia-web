package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.TouristSubscribeResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.service.TouristService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/subscriptions")
@PreAuthorize("hasRole('TURISTA')")
public class TouristController {

    private final TouristService touristService;

    public TouristController(TouristService touristService) {
        this.touristService = touristService;
    }

    @PostMapping("/services/{serviceId}")
    public ResponseEntity<TouristSubscribeResponseDTO> subscribeToService(@PathVariable UUID serviceId) {
        TouristSubscribeResponseDTO response = this.touristService.subscribeToService(serviceId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/events/{eventId}")
    public ResponseEntity<TouristSubscribeResponseDTO> subscribeToEvent(@PathVariable UUID eventId) {
        TouristSubscribeResponseDTO response = this.touristService.subscribeToEvent(eventId);
        return ResponseEntity.ok(response);
    }
}
