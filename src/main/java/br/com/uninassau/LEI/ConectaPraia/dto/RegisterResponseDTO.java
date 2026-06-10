package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;

public record RegisterResponseDTO(String name, String email, Role role) {
}
