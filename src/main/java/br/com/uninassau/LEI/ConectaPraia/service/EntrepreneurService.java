package br.com.uninassau.LEI.ConectaPraia.service;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.dto.request.UpdateProfileRequestDTO;
import br.com.uninassau.LEI.ConectaPraia.repositories.EntrepreneurRepository;
import br.com.uninassau.LEI.ConectaPraia.utils.AuthUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EntrepreneurService {

    private final EntrepreneurRepository entrepreneurRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthUtil authUtil;

    public EntrepreneurService(EntrepreneurRepository entrepreneurRepository, PasswordEncoder passwordEncoder, AuthUtil authUtil) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.passwordEncoder = passwordEncoder;
        this.authUtil = authUtil;
    }

    public void updateEntrepreneurProfile (UpdateProfileRequestDTO request) {
        Entrepreneur entrepreneur = (Entrepreneur) authUtil.getUserLoggedIn();

        entrepreneur.setName(request.name());
        entrepreneur.setEmail(request.email());
        entrepreneur.setAvatarUrl(request.avatarUrl());

        if (request.password() != null && !request.password().isBlank()) {
            String encodedPassword = passwordEncoder.encode(request.password());
            entrepreneur.setPassword(encodedPassword);
        }

        // 🟢 CORREÇÃO: Salva as alterações de fato no banco de dados
        entrepreneurRepository.save(entrepreneur);
    }
}
