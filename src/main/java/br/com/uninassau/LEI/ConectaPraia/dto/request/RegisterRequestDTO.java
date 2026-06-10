package br.com.uninassau.LEI.ConectaPraia.dto.request;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @NotBlank
        String name,
        @NotBlank @Email
        String email,
        @NotBlank @Size(max = 14, min = 11)
        String cpf,
        @NotBlank
        String phone,
        @NotBlank
        @Size(min = 6)
        String password,
        @NotBlank
        Role role) {
}
