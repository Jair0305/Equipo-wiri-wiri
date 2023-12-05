package mx.com.MunchEZ.MunchEZ.infra.error;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.xml.bind.ValidationException;

@RestControllerAdvice
public class ErrorHandling {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity ErrorHandling404()
    {
        return ResponseEntity.notFound().build();
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity ErrorHandling400(MethodArgumentNotValidException e)
    {
        var errores = e.getFieldError().getDefaultMessage();
        return ResponseEntity.badRequest().body(errores);
    }

    @ExceptionHandler(IntegrityValidation.class)
    public ResponseEntity ErrorHandlingIntegrityValidation(IntegrityValidation e)
    {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity ErrorHandlingValidationException(ValidationException e)
    {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    private record DataErrorValidation(String campo, String error) {
        public DataErrorValidation(String campo, String error) {
            this.campo = campo;
            this.error = error;
        }
    }
}
