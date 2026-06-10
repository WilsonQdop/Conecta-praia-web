package br.com.uninassau.LEI.ConectaPraia.exceptions;

public class EmailAlreadyInUseException extends RuntimeException {

    public EmailAlreadyInUseException() {
        super("email já existe");
    }
}
