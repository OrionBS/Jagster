package net.jagster.financial.exception;

public class UnknownAccountException extends RuntimeException {

    public UnknownAccountException() {
        super("Unknown account.");
    }
}
