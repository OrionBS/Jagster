package net.jagster.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CurrencyRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String code;
    @NotBlank
    private String symbol;
}
