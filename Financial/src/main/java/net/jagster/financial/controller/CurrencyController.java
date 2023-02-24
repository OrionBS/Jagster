package net.jagster.financial.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.CurrencyRequest;
import net.jagster.financial.dto.response.CurrencyResponse;
import net.jagster.financial.service.impl.CurrencyServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "currencies")
@RequiredArgsConstructor
public class CurrencyController {

    private final CurrencyServiceImpl currencyService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<CurrencyResponse> getCurrencies() {
        return currencyService.getCurrencies();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CurrencyResponse postCurrency(@Valid @RequestBody CurrencyRequest currencyRequest) {
        return currencyService.postCurrency(currencyRequest);
    }

    @GetMapping(path = "/{currencyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public CurrencyResponse getCurrencyById(@PathVariable Long currencyId) {
        return currencyService.getCurrencyById(currencyId);
    }

    @PutMapping(path = "/{currencyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public CurrencyResponse putCurrencyById(@PathVariable Long currencyId, @Valid @RequestBody CurrencyRequest currencyRequest) {
        return currencyService.putCurrencyById(currencyId, currencyRequest);
    }

    @DeleteMapping(path = "/{currencyId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Long currencyId) {
        currencyService.deleteCurrencyById(currencyId);
    }

}
