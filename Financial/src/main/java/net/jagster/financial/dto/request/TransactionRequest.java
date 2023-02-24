package net.jagster.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TransactionRequest {
    @NotBlank
    private String description;
    @NotNull
    private LocalDate date;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private Long categoryId;
}
