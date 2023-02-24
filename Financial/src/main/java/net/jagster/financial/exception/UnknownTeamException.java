package net.jagster.financial.exception;

public class UnknownTeamException extends RuntimeException {

    public UnknownTeamException() {
        super("Unknown team.");
    }
}
