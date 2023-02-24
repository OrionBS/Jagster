package net.jagster.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class AccountRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotNull
    private BigDecimal initialAmount;
}
