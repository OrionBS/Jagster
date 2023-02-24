package net.jagster.financial.exception;

public class ConflictTransactionException extends RuntimeException {
    public ConflictTransactionException() {
        super("Conflict transaction.");
    }
}
