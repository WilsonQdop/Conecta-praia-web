package br.com.uninassau.LEI.ConectaPraia.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegisteredEventResponseDTO(
        UUID id,
        String title,
        String eventType,
        String location,
        String valueDescription,
        LocalDateTime dateHour,
        String entrepreneurName
) {}
