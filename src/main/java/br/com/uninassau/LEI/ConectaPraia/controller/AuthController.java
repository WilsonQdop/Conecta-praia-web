package br.com.uninassau.LEI.ConectaPraia.controller;

import br.com.uninassau.LEI.ConectaPraia.dto.LoginResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.RegisterResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.LoginRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.RegisterRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO login) {
        LoginResponseDTO response = authService.login(login);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO register) {
        // ✅ CORRIGIDO: Agora aceita qualquer role (TURISTA, EMPREENDEDOR, ADMIN)
        // Se quiser restringir, adicione validação aqui
        RegisterResponseDTO response = authService.register(register);
        return ResponseEntity.created(null).body(response);
    }
}
