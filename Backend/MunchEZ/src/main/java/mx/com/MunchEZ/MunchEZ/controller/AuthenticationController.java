package mx.com.MunchEZ.MunchEZ.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import mx.com.MunchEZ.MunchEZ.domain.Role.Role;
import mx.com.MunchEZ.MunchEZ.domain.Role.RoleRepository;
import mx.com.MunchEZ.MunchEZ.domain.user.UserEntity;
import mx.com.MunchEZ.MunchEZ.domain.user.UserRepository;
import mx.com.MunchEZ.MunchEZ.dto.AuthResponseDTO;
import mx.com.MunchEZ.MunchEZ.dto.LoginDTO;
import mx.com.MunchEZ.MunchEZ.dto.RegisterDTO;
import mx.com.MunchEZ.MunchEZ.infra.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository,
                                    PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {

        if(userRepository.existsByUsername(registerDTO.getUsername())){
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        Role role = roleRepository.findByName(registerDTO.getRole()).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        user.setAuthorities(Collections.singleton(role));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {

        if (loginDTO == null || loginDTO.getUser() == null ||
                loginDTO.getUser().getUsername() == null ||
                loginDTO.getUser().getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUser().getUsername(), loginDTO.getUser().getPassword(), loginDTO.getUser().getAuthorities()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        UserEntity user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found"));

        user.setAuthorities(roles.stream()
                .map(roleName -> roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found")))
                .collect(Collectors.toSet()));

        AuthResponseDTO responseDTO = new AuthResponseDTO(user, token);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }




}
