package net.jagster.financial.exception;

public class ConflictCurrencyException extends RuntimeException {
    public ConflictCurrencyException() {
        super("Conflict currency.");
    }
}
