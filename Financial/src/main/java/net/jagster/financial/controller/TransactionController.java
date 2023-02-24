package net.jagster.financial.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.jagster.financial.mapper.TransactionMapper;
import net.jagster.financial.dto.request.TransactionRequest;
import net.jagster.financial.dto.response.TransactionResponse;
import net.jagster.financial.service.impl.TransactionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionServiceImpl transactionService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<TransactionResponse> getTransactions() {
        return transactionService.getTransactions();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse postTransaction(@Valid @RequestBody TransactionRequest transactionRequest) {
        return TransactionMapper.toTransactionResponse(transactionService.insertTransaction(transactionRequest));
    }

    @GetMapping(path = "/{transactionId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TransactionResponse getTransactionById(@PathVariable Long transactionId) {
        return transactionService.getTransactionById(transactionId);
    }

    @PutMapping(path = "/{transactionId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TransactionResponse putTransaction(@PathVariable Long transactionId, @Valid @RequestBody TransactionRequest transactionDto) {
        return transactionService.putTransactionById(transactionId, transactionDto);
    }

    @DeleteMapping(path = "/{transactionId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTransactionFromAccount(@PathVariable Long transactionId) {
        transactionService.deleteTransactionById(transactionId);
    }

    @PutMapping(path = "/{transactionId}/categories/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TransactionResponse putTransactionByIdWithCategoryById(@PathVariable Long transactionId, @PathVariable Long categoryId) {
        return transactionService.putTransactionByIdWithCategoryById(transactionId, categoryId);
    }

}
