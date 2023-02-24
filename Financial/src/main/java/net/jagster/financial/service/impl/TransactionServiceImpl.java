package net.jagster.financial.service.impl;

import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.TransactionRequest;
import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.entity.Category;
import net.jagster.financial.entity.Transaction;
import net.jagster.financial.exception.UnknownCategoryException;
import net.jagster.financial.exception.UnknownTransactionException;
import net.jagster.financial.mapper.TransactionMapper;
import net.jagster.financial.repository.CategoryRepository;
import net.jagster.financial.repository.TransactionRepository;
import net.jagster.financial.service.TransactionService;
import net.jagster.financial.util.JwtUtil;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public List<TransactionResponse> getTransactions() {
        return findTransactions()
                .stream()
                .map(TransactionMapper::toTransactionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Transaction> findTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    @Transactional
    public TransactionResponse getTransactionById(Long transactionId) {
        return TransactionMapper.toTransactionResponse(findTransactionById(transactionId));
    }

    @Override
    public Transaction findTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId).orElseThrow(() -> {
            throw new UnknownTransactionException();
        });
    }

    @Override
    @Transactional
    public TransactionResponse postTransaction(TransactionRequest transactionRequest) {
        return TransactionMapper.toTransactionResponse(insertTransaction(transactionRequest));
    }

    @Override
    public Transaction insertTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setDate(Timestamp.valueOf(transactionRequest.getDate().atStartOfDay()));
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setUserId(JwtUtil.getSubject());
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public TransactionResponse putTransactionById(Long transactionId, TransactionRequest transactionRequest) {
        return TransactionMapper.toTransactionResponse(updateTransactionById(transactionId, transactionRequest));
    }

    @Override
    public Transaction updateTransactionById(Long transactionId, TransactionRequest transactionRequest) {
        Transaction transaction = transactionRepository.findTransactionByIdAndUserIdIgnoreCase(transactionId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownTransactionException();
        });
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setDate(Timestamp.valueOf(transactionRequest.getDate().atStartOfDay()));
        transaction.setAmount(transactionRequest.getAmount());
        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransactionById(Long transactionId) {
        Transaction transaction = transactionRepository.findTransactionByIdAndUserIdIgnoreCase(transactionId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownTransactionException();
        });
        transactionRepository.delete(transaction);
    }

    @Override
    public TransactionResponse putTransactionByIdWithCategoryById(Long transactionId, Long categoryId) {
        return TransactionMapper.toTransactionResponse(updateTransactionByIdWithCategoryById(transactionId, categoryId));
    }

    @Override
    public Transaction updateTransactionByIdWithCategoryById(Long transactionId, Long categoryId) {
        Transaction transaction = transactionRepository.findTransactionByIdAndUserIdIgnoreCase(transactionId, JwtUtil.getSubject()).orElseThrow(() -> {
            throw new UnknownTransactionException();
        });
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new UnknownCategoryException();
        });
        transaction.setCategory(category);
        return transactionRepository.save(transaction);
    }
}
