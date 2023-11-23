package mx.com.MunchEZ.MunchEZ.domain.personal;

//Nota para juan luis: En los archivos tipo  "Record", los getters y los setters se generan automaticamente,
//por lo que no es necesario escribirlos, solo es necesario escribir los atributos de la clase en los parentesis
//Aqui no es neceario ingresar ningun @NotBlank o @NotNull, solo es necesario ingresar los atributos de la clase
//con sus respectivos tipos de datos


public record DataPersonalResponse (Long id, String name, Boolean active, Role role, String phone){
}
