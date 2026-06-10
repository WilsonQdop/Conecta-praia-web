package br.com.uninassau.LEI.ConectaPraia.dto.request;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;
import br.com.uninassau.LEI.ConectaPraia.service.UploadFilesService;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreatePostEventRequestDTO(
        @NotBlank
        String title,

        @NotNull
        TypeEvent eventType,

        @NotBlank
        String location,

        @NotNull
        @DecimalMin("0.0")
        BigDecimal value,

        @NotBlank
        String valueDescription,

        String imageUrl,

        @NotBlank
        String description
) {
}
