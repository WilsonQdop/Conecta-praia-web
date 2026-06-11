package br.com.uninassau.LEI.ConectaPraia.dto;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeEvent;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PostEventResponseDTO(
        UUID id,
        String title,
        TypeEvent eventType,
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
