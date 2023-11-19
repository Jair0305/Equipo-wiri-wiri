package mx.com.MunchEZ.MunchEZ.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HolloController {
    @GetMapping
    public String helloWorld(){
        return "pito a todos";
    }
}
