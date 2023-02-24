package net.jagster.financial.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.AccountRequest;
import net.jagster.financial.dto.response.AccountResponse;
import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.service.impl.AccountServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountServiceImpl accountService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<AccountResponse> getAccounts() {
        return accountService.getAccounts();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public AccountResponse postAccount(@Valid @RequestBody AccountRequest accountRequest) {
        return accountService.postAccount(accountRequest);
    }

    @GetMapping(path = "/{accountId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public AccountResponse getAccountById(@PathVariable Long accountId) {
        return accountService.getAccountById(accountId);
    }

    @PutMapping(path = "/{accountId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public AccountResponse putAccount(@PathVariable Long accountId, @Valid @RequestBody AccountRequest accountRequest) {
        return accountService.putAccount(accountId, accountRequest);
    }

    @DeleteMapping(path = "/{accountId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
    }

    @PutMapping(path = "/{accountId}/currencies/{currencyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public AccountResponse putAccountByIdWithCurrencyById(@PathVariable Long accountId, @PathVariable Long currencyId) {
        return accountService.putAccountByIdWithCurrencyById(accountId, currencyId);
    }

    @GetMapping(path = "/{accountId}/transactions", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<TransactionResponse> getTransactionsOfAccountById(@PathVariable Long accountId) {
        return accountService.getTransactionsByAccountById(accountId);
    }

    @PutMapping(path = "/{accountId}/transactions/{transactionId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TransactionResponse putAccountByIdWithTransactionById(@PathVariable Long accountId, @PathVariable Long transactionId) {
        return accountService.putAccountByIdWithTransactionById(accountId, transactionId);
    }

}
