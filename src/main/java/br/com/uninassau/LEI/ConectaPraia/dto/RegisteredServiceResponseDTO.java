package br.com.uninassau.LEI.ConectaPraia.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegisteredServiceResponseDTO(
        UUID id,
        String title,
        String serviceType,
        String location,
        String valueDescription,
        LocalDateTime dateHour,
        String entrepreneurName
) {}
