package net.jagster.financial.exception;

public class UnknownTransactionException extends RuntimeException {
    public UnknownTransactionException() {
        super("Unknown transaction.");
    }
}
