package mx.com.MunchEZ.MunchEZ.controller;

//Nota para juan luis: Aqui es donde se hacen las peticiones de tipo GET, POST, PUT, DELETE, etc.
//Aqui es donde se hace la logica de la aplicacion, por ejemplo, si se quiere hacer un registro de un personal
//Guiate con el archivo ProductController.java para ver como se hace un registro de un producto, son basicamente
//los mismos pasos, solo que en este caso, se hara un registro de un personal, para esto, se necesita
//un DataPersonalRegister.java, un PersonalRepository.java, un DataPersonalResponse.java
//Acuerdate que cada personal tiene un rol, por lo que se necesita hacer uso tambien de un Role.java, es un enum
//en products tambien se hace uso de un enum de food, drinks, desserts, puedes toamrlo como referencia apra hacer aca kitchen, cashier, admin
//Recuerda que el rol debe ser en mayusculas y no se te olvide agregar los @ asi como estan en productController
//solo vas a hacer uso de los archivos que te digo, no tienes que usar mas, de referencia puedes verlo, pero no uses los demas

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.personal.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

//PersonalController.java PersonalRepository.java DataPersonalRegister.java DataPersonalResponse.java Personal.java Role.java
//en cada archivo de los que tienes que modificar, te deje un comentario de como hacerlo
@RestController
@RequestMapping("/personal")
@SecurityRequirement(name = "bearer-key")

public class PersonalController {

    @Autowired
    private PersonalRepository personalRepository;


    @GetMapping
    public ResponseEntity<Page<DataListPersonal>> listar(@PageableDefault(size = 10, page = 0, sort = {"type"}) Pageable pageable)
   {
        var page = ResponseEntity.ok(personalRepository.findAll(pageable).map(DataListPersonal::new));
        return ResponseEntity.ok(page.getBody());
    }
    @GetMapping("/active")
    public List<Personal> getAllPersonalActive() {return personalRepository.findAllByActive(Boolean.TRUE);}

    @GetMapping("/admin")
    public List<Personal> getAllPersonalAdmin() {return personalRepository.findPersonalByRole(Role.ADMIN);}

    @GetMapping("/kitchen")
    public List<Personal> getAllPersonalKitchen() {return personalRepository.findPersonalByRole(Role.KITCHEN);}

    @GetMapping("/cashier")
    public List<Personal> getAllPersonalCashier() {return personalRepository.findPersonalByRole(Role.CASHIER);}

    @PostMapping
    public ResponseEntity<DataPersonalResponse> registerPersonal(@RequestBody @Valid DataPersonalRegister dataPersonalRegister, UriComponentsBuilder uriComponentsBuilder)
    {
        Personal personal = personalRepository.save(new Personal(dataPersonalRegister));
        DataPersonalResponse dataPersonalResponse = new  DataPersonalResponse(personal.getId(), personal.getName(), personal.getActive(), personal.getRole(), personal.getPhone());

        URI url = uriComponentsBuilder.path("/personal").buildAndExpand(personal.getId()).toUri();
        return ResponseEntity.created(url).body(dataPersonalResponse);
    }
}
