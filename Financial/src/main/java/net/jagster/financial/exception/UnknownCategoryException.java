package net.jagster.financial.exception;

public class UnknownCategoryException extends RuntimeException {
    public UnknownCategoryException() {
        super("Unknown category.");
    }
}
