package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PostServiceResponseDTO(
        UUID id,
        String title,
        TypeService serviceType,
        String location,
        BigDecimal value,
        String valueDescription,
        String imageUrl,
        String description,
        LocalDateTime createdAt,
        LocalDateTime dateHour,
        String entrepreneurName,     // ← NOVO
        UUID entrepreneurId          // ← NOVO
) {}
