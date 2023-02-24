package net.jagster.financial.mapper;

import net.jagster.financial.entity.Transaction;
import net.jagster.financial.dto.response.TransactionResponse;

public class TransactionMapper {

    public static TransactionResponse toTransactionResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .description(transaction.getDescription())
                .date(transaction.getDate().toLocalDateTime().toLocalDate())
                .amount(transaction.getAmount())
                .accountId(transaction.getAccount() != null ? transaction.getAccount().getId() : null)
                .categoryId(transaction.getCategory() != null ? transaction.getCategory().getId() : null)
                .build();
    }
}
