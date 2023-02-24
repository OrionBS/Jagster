package net.jagster.financial.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CurrencyResponse {
    private Long id;
    private String name;
    private String code;
    private String symbol;
}
