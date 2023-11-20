package mx.com.MunchEZ.MunchEZ.infra.error;

public class IntegrityValidation extends RuntimeException {

    public IntegrityValidation(String message) {
        super(message);
    }
}
