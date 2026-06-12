package br.com.uninassau.LEI.ConectaPraia.service.auth;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.exceptions.EmailAlreadyInUseException;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import br.com.uninassau.LEI.ConectaPraia.domain.User;
import br.com.uninassau.LEI.ConectaPraia.dto.LoginResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.RegisterResponseDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.LoginRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.dto.request.RegisterRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncryption;

    public AuthService(TokenService tokenService, UserRepository userRepository, BCryptPasswordEncoder passwordEncryption) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncryption = passwordEncryption;
    }

    public LoginResponseDTO login (LoginRequestDTO login) {
        User user = this.userRepository.findByEmail(login.email()).orElseThrow(
                () -> new RuntimeException("Usúario não encontrado"));

        if (!passwordEncryption.matches(login.password(), user.getPassword())) {
            throw new BadCredentialsException("Senhas não correspondentes");
        }

        String token = this.tokenService.generateToken(user);
        return new LoginResponseDTO(user.getName(), token, user.getRole());
    }

    public RegisterResponseDTO register(RegisterRequestDTO register) {

        if (this.userRepository.existsByEmail(register.email())) {
            throw new EmailAlreadyInUseException();
        }

        User user = switch (register.role()) {
            case TURISTA  -> new Tourist();
            case EMPREENDEDOR -> new Entrepreneur();
            default -> throw new IllegalArgumentException("Role inválida: " + register.role());
        };

        user.setName(register.name());
        user.setEmail(register.email());
        user.setCpf(register.cpf());
        user.setPhone(register.phone());
        user.setPassword(passwordEncryption.encode(register.password()));
        user.setRole(register.role());

        userRepository.save(user);
        return new RegisterResponseDTO(user.getName(), user.getEmail(), user.getRole());
    }
}
