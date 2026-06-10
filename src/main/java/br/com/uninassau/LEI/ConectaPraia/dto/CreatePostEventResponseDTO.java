package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreatePostEventResponseDTO(
        @NotBlank
        String title,
        @NotBlank
        TypeEvent eventType,
        @NotBlank
        String location,
        @NotBlank
        @Size(max = 5000)
        BigDecimal value,
        @NotBlank
        String valueDescription,
        String imageUrl,
        @NotBlank
        @Column(columnDefinition = "TEXT")
        String description,
        LocalDateTime createdAt,
        LocalDateTime dateHour
) {
}
