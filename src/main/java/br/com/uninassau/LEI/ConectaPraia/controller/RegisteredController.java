package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.RegisteredEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.RegisteredServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.service.RegisteredService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/registered")
@PreAuthorize("hasRole('TURISTA')")
public class RegisteredController {

    private final RegisteredService registeredService;

    public RegisteredController(RegisteredService registeredService) {
        this.registeredService = registeredService;
    }

    @GetMapping("/events")
    public ResponseEntity<List<RegisteredEventResponseDTO>> getMyRegisteredEvents() {
        List<RegisteredEventResponseDTO> events = this.registeredService.findAllRegisteredEventsForTourist();

        return ResponseEntity.ok(events);
    }

    @GetMapping("/services")
    public ResponseEntity<List<RegisteredServiceResponseDTO>> getMyRegisteredServices() {
        List<RegisteredServiceResponseDTO> services = this.registeredService.findAllRegisteredServicesForTourist();

        return ResponseEntity.ok(services);
    }
}
