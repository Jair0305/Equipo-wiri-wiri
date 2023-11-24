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
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.personal.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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

    // Hola, ira aki es donde no supe moverle pipipipi
    // creo q el error puede venir del DataListPersonal
    @GetMapping
    public ResponseEntity<Page<DataListPersonal>> listar(@PageableDefault(size = 10, page = 0, sort = {"role"}) Pageable pageable)
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

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletePersonal(@PathVariable Long id)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Personal not found with id: " + id));
        personal.disablePersonal();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DataPersonalResponse> updatePersonal(@PathVariable Long id, @RequestBody @Valid DataPersonalUpdate dataPersonalUpdate)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Personal not found with id: " + id));
        personal.updatePersonal(dataPersonalUpdate);
        DataPersonalResponse dataPersonalResponse = new DataPersonalResponse(personal.getId(), personal.getName(), personal.getActive(), personal.getRole(), personal.getPhone());
        return ResponseEntity.ok(dataPersonalResponse);
    }
}
