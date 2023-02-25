package net.jagster.financial.service.impl;

import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.response.AccountResponse;
import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.entity.Account;
import net.jagster.financial.entity.Currency;
import net.jagster.financial.entity.Transaction;
import net.jagster.financial.exception.ConflictAccountException;
import net.jagster.financial.exception.UnknownAccountException;
import net.jagster.financial.exception.UnknownCurrencyException;
import net.jagster.financial.exception.UnknownTransactionException;
import net.jagster.financial.dto.request.AccountRequest;
import net.jagster.financial.mapper.AccountMapper;
import net.jagster.financial.mapper.TransactionMapper;
import net.jagster.financial.repository.AccountRepository;
import net.jagster.financial.repository.CurrencyRepository;
import net.jagster.financial.repository.TransactionRepository;
import net.jagster.financial.service.AccountService;
import net.jagster.financial.util.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final CurrencyRepository currencyRepository;

    @Override
    @Transactional
    public List<AccountResponse> getAccounts() {
        return findAccounts()
                .stream()
                .map(AccountMapper::toAccountResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Account> findAccounts() {
        return accountRepository.findAccountsByUserIdIgnoreCase(JwtUtil.getSubject());
    }

    @Override
    @Transactional
    public AccountResponse getAccountById(Long accountId) {
        return AccountMapper.toAccountResponse(findAccountById(accountId));
    }

    @Override
    public Account findAccountById(Long accountId) {
        return accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
    }

    @Override
    @Transactional
    public AccountResponse postAccount(AccountRequest accountRequest) {
        return AccountMapper.toAccountResponse(insertAccount(accountRequest));
    }

    @Override
    public Account insertAccount(AccountRequest accountRequest) {
        accountRepository.findAccountByUserIdIgnoreCaseAndNameIgnoreCase(JwtUtil.getSubject(), accountRequest.getName()).ifPresent(account -> {
            throw new ConflictAccountException();
        });
        Account account = new Account();
        account.setUserId(JwtUtil.getSubject());
        account.setName(accountRequest.getName());
        account.setDescription(accountRequest.getDescription());
        account.setInitialAmount(accountRequest.getInitialAmount());
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public AccountResponse putAccount(Long accountId, AccountRequest accountRequest) {
        return AccountMapper.toAccountResponse(updateAccount(accountId, accountRequest));
    }

    @Override
    public Account updateAccount(Long accountId, AccountRequest accountRequest) {
        Account account = accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
        account.setName(accountRequest.getName());
        account.setDescription(accountRequest.getDescription());
        account.setInitialAmount(accountRequest.getInitialAmount());
        return accountRepository.save(account);
    }

    @Override
    public void deleteAccount(Long accountId) {
        Account account = accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
        accountRepository.delete(account);
    }

    @Override
    @Transactional
    public List<TransactionResponse> getTransactionsByAccountById(Long accountId) {
        return findTransactionsByAccountId(accountId)
                .stream()
                .map(TransactionMapper::toTransactionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Transaction> findTransactionsByAccountId(Long accountId) {
        Account account = accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
        return account.getTransactions();
    }

    @Override
    public TransactionResponse putAccountByIdWithTransactionById(Long accountId, Long transactionId) {
        return TransactionMapper.toTransactionResponse(updateTransactionByIdOfAccountById(accountId, transactionId));
    }

    @Override
    public Transaction updateTransactionByIdOfAccountById(Long accountId, Long transactionId) {
        Account account = accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
        Transaction transaction = transactionRepository.findTransactionByIdAndUserIdIgnoreCase(transactionId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownTransactionException();
        });
        transaction.setAccount(account);
        return transactionRepository.save(transaction);
    }

    @Override
    public AccountResponse putAccountByIdWithCurrencyById(Long accountId, Long currencyId) {
        return AccountMapper.toAccountResponse(updateAccountByIdWithCurrencyById(accountId, currencyId));
    }

    @Override
    public Account updateAccountByIdWithCurrencyById(Long accountId, Long currencyId) {
        Account account = accountRepository.findAccountByIdAndUserIdIgnoreCase(accountId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownAccountException();
        });
        Currency currency = currencyRepository.findById(currencyId).orElseThrow(() -> {
            throw new UnknownCurrencyException();
        });
        account.setCurrency(currency);
        return accountRepository.save(account);
    }
}
