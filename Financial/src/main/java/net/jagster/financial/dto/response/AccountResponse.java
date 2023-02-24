package net.jagster.financial.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class AccountResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal initialAmount;
    private Long currencyId;
    private List<Long> transactionIds = new ArrayList<>();
}
