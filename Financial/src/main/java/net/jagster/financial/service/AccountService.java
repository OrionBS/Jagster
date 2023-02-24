package net.jagster.financial.service;

import net.jagster.financial.dto.response.AccountResponse;
import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.entity.Account;
import net.jagster.financial.entity.Transaction;
import net.jagster.financial.dto.request.AccountRequest;

import java.util.List;

public interface AccountService {
    List<AccountResponse> getAccounts();

    List<Account> findAccounts();

    AccountResponse getAccountById(Long accountId);

    Account findAccountById(Long accountId);

    AccountResponse postAccount(AccountRequest accountRequest);

    Account insertAccount(AccountRequest accountRequest);

    AccountResponse putAccount(Long accountId, AccountRequest accountRequest);

    Account updateAccount(Long accountId, AccountRequest accountRequest);

    void deleteAccount(Long accountId);

    List<TransactionResponse> getTransactionsByAccountById(Long accountId);

    List<Transaction> findTransactionsByAccountId(Long accountId);

    TransactionResponse putAccountByIdWithTransactionById(Long accountId, Long transactionId);

    Transaction updateTransactionByIdOfAccountById(Long accountId, Long transactionId);

    AccountResponse putAccountByIdWithCurrencyById(Long accountId, Long currencyId);

    Account updateAccountByIdWithCurrencyById(Long accountId, Long currencyId);
}
