package net.jagster.financial.mapper;

import net.jagster.financial.entity.Account;
import net.jagster.financial.entity.Transaction;
import net.jagster.financial.dto.response.AccountResponse;

import java.util.stream.Collectors;

public class AccountMapper {

    public static AccountResponse toAccountResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .name(account.getName())
                .description(account.getDescription())
                .currencyId(account.getCurrency() != null ? account.getCurrency().getId() : null)
                .transactionIds(account.getTransactions().stream().map(Transaction::getId).collect(Collectors.toList()))
                .build();
    }

}
