package mx.com.MunchEZ.MunchEZ.domain.personal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

//Nota para juan luis: En los archivos tipo  "Record", los getters y los setters se generan automaticamente,
//por lo que no es necesario escribirlos, solo es necesario escribir los atributos de la clase en los parentesis
//En caso de este archivo, recuerda ingresar por cada atributo de tipo String, un @NotBlank
//y por cada atributo de otro tipo que no sea String, un @NotNull
public record DataPersonalRegister(@NotBlank String name, @NotNull Role role, @NotBlank String phone, @NotNull boolean active){
}
