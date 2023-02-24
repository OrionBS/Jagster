package net.jagster.financial.service;

import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.entity.Transaction;
import net.jagster.financial.dto.request.TransactionRequest;

import java.util.List;

public interface TransactionService {

    List<TransactionResponse> getTransactions();
    List<Transaction> findTransactions();
    TransactionResponse getTransactionById(Long transactionId);
    Transaction findTransactionById(Long transactionId);
    TransactionResponse postTransaction(TransactionRequest transactionRequest);
    Transaction insertTransaction(TransactionRequest transactionRequest);
    TransactionResponse putTransactionById(Long transactionId, TransactionRequest transactionRequest);
    Transaction updateTransactionById(Long transactionId, TransactionRequest transactionRequest);
    void deleteTransactionById(Long transactionId);
    TransactionResponse putTransactionByIdWithCategoryById(Long transactionId, Long categoryId);
    Transaction updateTransactionByIdWithCategoryById(Long transactionId, Long categoryId);
}
