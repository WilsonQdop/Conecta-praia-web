package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.TouristSubscribeResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.UpdateProfileRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.TouristService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/subscriptions")

public class TouristController {

    private final TouristService touristService;

    public TouristController(TouristService touristService) {
        this.touristService = touristService;
    }

    @PreAuthorize("hasRole('TURISTA')")
    @PostMapping("/services/{serviceId}")
    public ResponseEntity<TouristSubscribeResponseDTO> subscribeToService(@PathVariable UUID serviceId) {
        TouristSubscribeResponseDTO response = this.touristService.subscribeToService(serviceId);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('TURISTA')")
    @PostMapping("/events/{eventId}")
    public ResponseEntity<TouristSubscribeResponseDTO> subscribeToEvent(@PathVariable UUID eventId) {
        TouristSubscribeResponseDTO response = this.touristService.subscribeToEvent(eventId);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('ROLE_TURISTA')")
    @PutMapping("/update")
    public ResponseEntity<Void> updateTourist(@Valid @RequestBody UpdateProfileRequestDTO request) {

        touristService.updateTouristProfile(request);

        return ResponseEntity.ok().build();
    }
}
