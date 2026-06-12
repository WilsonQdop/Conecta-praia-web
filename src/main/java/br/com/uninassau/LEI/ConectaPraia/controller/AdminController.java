package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.dto.EntrepreneurResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostEventResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.PostServiceResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.TouristResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.service.AdminService;
import br.com.uninassau.LEI.ConectaPraia.service.PostEventService;
import br.com.uninassau.LEI.ConectaPraia.service.PostServiceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;

@RequestMapping("admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/all-events")
    @PreAuthorize("hasAnyRole('ADMIN', 'TURISTA')")
    public ResponseEntity<List<PostEventResponseDTO>> getAllEvents() {
        System.out.println("[CONTROLLER] GET /postEvent/all-events");

        List<PostEventResponseDTO> events = this.adminService.findAllEvents();

        return ResponseEntity.ok(events);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TURISTA')")
    @GetMapping("/all-services")
    public ResponseEntity<List<PostServiceResponseDTO>> getAllServices() {
        List<PostServiceResponseDTO> services = this.adminService.findAll();

        return ResponseEntity.ok(services);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/technical/findAll")
    public ResponseEntity<Stream<TouristResponseDTO>> getAllTourist () {
        Stream<TouristResponseDTO> technical = this.adminService.getAllTourist();

        return ResponseEntity.status(HttpStatus.OK).body(technical);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/customer/findAll")
    public ResponseEntity<Stream<EntrepreneurResponseDTO>> getAllEntrepreneur () {
        Stream<EntrepreneurResponseDTO> Tourist = this.adminService.getAllEntrepreneur();

        return ResponseEntity.status(HttpStatus.OK).body(Tourist);
    }
}
