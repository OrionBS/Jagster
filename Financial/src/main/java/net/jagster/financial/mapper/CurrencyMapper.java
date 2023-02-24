package net.jagster.financial.mapper;

import net.jagster.financial.entity.Currency;
import net.jagster.financial.dto.response.CurrencyResponse;

public class CurrencyMapper {

    public static CurrencyResponse toCurrencyResponse(Currency currency) {
        return CurrencyResponse.builder()
                .id(currency.getId())
                .name(currency.getName())
                .code(currency.getCode())
                .symbol(currency.getSymbol())
                .build();
    }

}
