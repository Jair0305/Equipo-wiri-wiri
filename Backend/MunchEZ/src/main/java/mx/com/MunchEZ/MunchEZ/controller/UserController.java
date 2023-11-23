package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.personal.Personal;
import mx.com.MunchEZ.MunchEZ.domain.user.DataRegisterUser;
import mx.com.MunchEZ.MunchEZ.domain.user.DataResponseUser;
import mx.com.MunchEZ.MunchEZ.domain.user.User;
import mx.com.MunchEZ.MunchEZ.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/user")
@SecurityRequirement(name = "bearer-key")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<DataResponseUser> registerUser(@RequestBody @Valid DataRegisterUser dataRegisterUser, UriComponentsBuilder uriComponentsBuilder)
    {
        Personal personal = new Personal(dataRegisterUser.personal_id());
        User user = userRepository.save(new User(dataRegisterUser));

        DataResponseUser dataResponseUser = new DataResponseUser(user.getId(), user.getUsername(), user.getPersonal_id().getId());

        URI url = uriComponentsBuilder.path("/user").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataResponseUser> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        DataResponseUser dataResponseUser = new DataResponseUser(user.getId(), user.getUsername(), user.getPersonal_id().getId());
        return ResponseEntity.ok(dataResponseUser);
    }
}
