package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;

public record LoginResponseDTO(String name, String token, Role role) {
}
