package net.jagster.financial.service.impl;

import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.CurrencyRequest;
import net.jagster.financial.dto.response.CurrencyResponse;
import net.jagster.financial.entity.Currency;
import net.jagster.financial.exception.ConflictCurrencyException;
import net.jagster.financial.exception.UnknownCurrencyException;
import net.jagster.financial.mapper.CurrencyMapper;
import net.jagster.financial.repository.CurrencyRepository;
import net.jagster.financial.service.CurrencyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {
    private final CurrencyRepository currencyRepository;

    @Override
    @Transactional
    public List<CurrencyResponse> getCurrencies() {
        return findCurrencies()
                .stream()
                .map(CurrencyMapper::toCurrencyResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Currency> findCurrencies() {
        return currencyRepository.findAll();
    }

    @Override
    @Transactional
    public CurrencyResponse getCurrencyById(Long currencyId) {
        return CurrencyMapper.toCurrencyResponse(findCurrencyById(currencyId));
    }

    @Override
    public Currency findCurrencyById(Long currencyId) {
        return currencyRepository.findById(currencyId).orElseThrow(() -> {
            throw new UnknownCurrencyException();
        });
    }

    @Override
    @Transactional
    public CurrencyResponse postCurrency(CurrencyRequest currencyRequest) {
        return CurrencyMapper.toCurrencyResponse(insertCurrency(currencyRequest));
    }

    @Override
    public Currency insertCurrency(CurrencyRequest currencyRequest) {
        currencyRepository.findCurrencyByCodeIgnoreCase(currencyRequest.getCode()).ifPresent(currency -> {
            throw new ConflictCurrencyException();
        });
        Currency currency = new Currency();
        currency.setName(currencyRequest.getName());
        currency.setCode(currencyRequest.getCode());
        currency.setSymbol(currencyRequest.getSymbol());
        return currencyRepository.save(currency);
    }

    @Override
    @Transactional
    public CurrencyResponse putCurrencyById(Long currencyId, CurrencyRequest currencyRequest) {
        return CurrencyMapper.toCurrencyResponse(updateCurrencyById(currencyId, currencyRequest));
    }

    @Override
    public Currency updateCurrencyById(Long currencyId, CurrencyRequest currencyRequest) {
        Currency currency = currencyRepository.findById(currencyId).orElseThrow(() -> {
            throw new UnknownCurrencyException();
        });
        currency.setName(currencyRequest.getName());
        currency.setCode(currencyRequest.getCode());
        currency.setSymbol(currencyRequest.getSymbol());
        return currencyRepository.save(currency);
    }

    @Override
    public void deleteCurrencyById(Long currencyId) {
        Currency currency = currencyRepository.findById(currencyId).orElseThrow(() -> {
            throw new UnknownCurrencyException();
        });
        currencyRepository.delete(currency);
    }
}
