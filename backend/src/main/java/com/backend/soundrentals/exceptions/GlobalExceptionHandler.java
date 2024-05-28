package com.backend.soundrentals.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({UsernameAlreadyExistsException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> manejarlreadyExistsException(UsernameAlreadyExistsException exception) {
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje", "Dj ya existe: " + exception.getMessage());
        return mensaje;
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> manejarResourceNotFound(ResourceNotFoundException exception){
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje",exception.getMessage());
        return mensaje;
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> manejarBadRequestException(BadRequestException exception){
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje",exception.getMessage());
        return mensaje;
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> procesarValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();

        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            exceptionMessage.put(fieldName, errorMessage);
        });

        return exceptionMessage;
    }
}
