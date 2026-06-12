package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.request.UpdateProfileRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.EntrepreneurService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("empreendedor")
@PreAuthorize("hasRole('EMPREENDEDOR')")
public class EntrepreneurController {

    private final EntrepreneurService entrepreneurService;

    public EntrepreneurController(EntrepreneurService entrepreneurService) {
        this.entrepreneurService = entrepreneurService;
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateEntrepreneur(@Valid @RequestBody UpdateProfileRequestDTO request) {

        entrepreneurService.updateEntrepreneurProfile(request);

        return ResponseEntity.ok().build();
    }
}
