package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;

import java.util.UUID;

public record TouristResponseDTO(UUID id, String name, String email, String phone,
                                 Role role, String cpf, String profilePicture) {
}
