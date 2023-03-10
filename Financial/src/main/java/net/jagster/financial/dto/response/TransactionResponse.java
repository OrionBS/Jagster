package net.jagster.financial.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TransactionResponse {
    private Long id;
    private String description;
    private LocalDate date;
    private BigDecimal amount;
    private Long accountId;
    private Long categoryId;
}
