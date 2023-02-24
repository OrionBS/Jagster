package net.jagster.financial.service;

import net.jagster.financial.dto.request.CurrencyRequest;
import net.jagster.financial.dto.response.CurrencyResponse;
import net.jagster.financial.entity.Currency;

import java.util.List;

public interface CurrencyService {
    List<CurrencyResponse> getCurrencies();

    List<Currency> findCurrencies();

    CurrencyResponse getCurrencyById(Long currencyId);

    Currency findCurrencyById(Long currencyId);

    CurrencyResponse postCurrency(CurrencyRequest currencyRequest);

    Currency insertCurrency(CurrencyRequest currencyRequest);

    CurrencyResponse putCurrencyById(Long currencyId, CurrencyRequest currencyRequest);

    Currency updateCurrencyById(Long currencyId, CurrencyRequest currencyRequest);

    void deleteCurrencyById(Long currencyId);

}
