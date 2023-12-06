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
import mx.com.MunchEZ.MunchEZ.domain.Role.Role;
import mx.com.MunchEZ.MunchEZ.domain.Role.RoleRepository;
import mx.com.MunchEZ.MunchEZ.domain.personal.*;
import mx.com.MunchEZ.MunchEZ.infra.error.IntegrityValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.crypto.Data;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

//PersonalController.java PersonalRepository.java DataPersonalRegister.java DataPersonalResponse.java Personal.java Role.java
//en cada archivo de los que tienes que modificar, te deje un comentario de como hacerlo
@RestController
@RequestMapping("/personal")
@SecurityRequirement(name = "bearer-key")

public class PersonalController {

    @Autowired
    private PersonalRepository personalRepository;

    @Autowired
    private RoleRepository roleRepository;
    @GetMapping("/active")
    public ResponseEntity<List<DataListPersonal>> getByActiveTrue() {
        List<DataListPersonal> dataList = personalRepository.findAllByActive(true)
                .stream()
                .map(personal -> new DataListPersonal(
                        personal.getId(),
                        personal.getName(),
                        personal.getActive(),
                        personal.getRole().getName(),
                        personal.getPhone()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dataList);
    }
    @GetMapping
    public ResponseEntity<List<DataListPersonal>> getAllPersonal() {
        List<DataListPersonal> dataList = personalRepository.findAll()
                .stream()
                .map(personal -> new DataListPersonal(
                        personal.getId(),
                        personal.getName(),
                        personal.getActive(),
                        personal.getRole().getName(),
                        personal.getPhone()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dataList);
    }
    @GetMapping("/admin")
    public ResponseEntity<List<DataListPersonal>> getAllAdmin() {
        Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
        List<DataListPersonal> dataList = personalRepository.findPersonalByRole(adminRole)
                .stream()
                .map(personal -> new DataListPersonal(
                        personal.getId(),
                        personal.getName(),
                        personal.getActive(),
                        adminRole.getName(),
                        personal.getPhone()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dataList);
    }

    @GetMapping("/kitchen")
    public ResponseEntity<List<DataListPersonal>> getAllKitchen() {
        Role kitchenRole = roleRepository.findByName("KITCHEN").orElseThrow();
        List<DataListPersonal> dataList = personalRepository.findPersonalByRole(kitchenRole)
                .stream()
                .map(personal -> new DataListPersonal(
                        personal.getId(),
                        personal.getName(),
                        personal.getActive(),
                        kitchenRole.getName(),
                        personal.getPhone()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dataList);
    }

    @GetMapping("/cashier")
    public ResponseEntity<List<DataListPersonal>> getAllCashier() {
        Role cashierRole = roleRepository.findByName("CASHIER").orElseThrow();
        List<DataListPersonal> dataList = personalRepository.findPersonalByRole(cashierRole)
                .stream()
                .map(personal -> new DataListPersonal(
                        personal.getId(),
                        personal.getName(),
                        personal.getActive(),
                        cashierRole.getName(),
                        personal.getPhone()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dataList);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DataPersonalResponse> registerPersonal(@RequestBody @Valid DataPersonalRegister dataPersonalRegister, UriComponentsBuilder uriComponentsBuilder) {
        try {
            Personal personal = new Personal(dataPersonalRegister, roleRepository);
            personal = personalRepository.save(personal);
            DataPersonalResponse dataPersonalResponse = new DataPersonalResponse(personal.getId(), personal.getName(), personal.getActive(), personal.getRole().getId(), personal.getPhone());

            URI url = uriComponentsBuilder.path("/personal").buildAndExpand(personal.getId()).toUri();
            return ResponseEntity.created(url).body(dataPersonalResponse);
        } catch (DataIntegrityViolationException e) {
            throw new IntegrityValidation("Personal already exists with this phone: " + dataPersonalRegister.phone());
        }
    }


    @PostMapping("/enable/{id}")
    @Transactional
    public ResponseEntity<?> enablePersonal(@PathVariable Long id)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Personal not found with id: " + id));
        personal.enablePersonal();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/disable/{id}")
    @Transactional
    public ResponseEntity<?> deletePersonal(@PathVariable Long id)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Personal not found with id: " + id));
        personal.disablePersonal();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletePersonalPermanently(@PathVariable Long id)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Personal not found with id: " + id));
        personalRepository.delete(personal);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DataPersonalResponse> updatePersonal(@PathVariable Long id, @RequestBody @Valid DataPersonalUpdate dataPersonalUpdate)
    {
        Personal personal = personalRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Personal not found with id: " + id));
        personal.updatePersonal(dataPersonalUpdate, roleRepository);
        personalRepository.save(personal);
        DataPersonalResponse dataPersonalResponse = new DataPersonalResponse(personal.getId(), personal.getName(), personal.getActive(), personal.getRole().getId(), personal.getPhone());
        return ResponseEntity.ok(dataPersonalResponse);
    }

}
