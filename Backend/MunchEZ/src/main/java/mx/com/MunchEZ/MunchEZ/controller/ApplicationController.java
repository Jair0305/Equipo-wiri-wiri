package mx.com.MunchEZ.MunchEZ.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ApplicationController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("Welcome, Admin!");
    }

    @PreAuthorize("hasRole('KITCHEN')")
    @GetMapping("/kitchen")
    public ResponseEntity<String> kitchenEndpoint() {
        return ResponseEntity.ok("Welcome, Kitchen!");
    }

    @PreAuthorize("hasRole('CASHIER')")
    @GetMapping("/cashier")
    public ResponseEntity<String> cashierEndpoint() {
        return ResponseEntity.ok("Welcome, Cashier!");
    }
}
