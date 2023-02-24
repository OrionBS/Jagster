package net.jagster.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TeamRequest {
    @NotBlank
    private String description;
    @NotBlank
    private String name;
}
