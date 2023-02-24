package net.jagster.financial.exception;

public class UnknownCurrencyException extends RuntimeException {
    public UnknownCurrencyException() {
        super("Unknown currency.");
    }
}
