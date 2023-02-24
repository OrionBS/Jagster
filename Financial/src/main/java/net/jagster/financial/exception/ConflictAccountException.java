package net.jagster.financial.exception;

public class ConflictAccountException extends RuntimeException {
    public ConflictAccountException() {
        super("Conflict account.");
    }
}
