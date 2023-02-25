package net.jagster.financial.controller;

import net.jagster.financial.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler({UnknownAccountException.class, UnknownCategoryException.class, UnknownCurrencyException.class, UnknownTransactionException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public RuntimeException unknownRuntimeException(RuntimeException runtimeException) {
        runtimeException.setStackTrace(new StackTraceElement[0]);
        return runtimeException;
    }

    @ExceptionHandler({ConflictCurrencyException.class, ConflictAccountException.class, ConflictCategoryException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public RuntimeException conflictRuntimeException(RuntimeException runtimeException) {
        runtimeException.setStackTrace(new StackTraceElement[0]);
        return runtimeException;
    }
}
