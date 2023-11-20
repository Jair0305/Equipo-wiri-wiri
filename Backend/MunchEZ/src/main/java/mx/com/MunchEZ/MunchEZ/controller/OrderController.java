package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import mx.com.MunchEZ.MunchEZ.domain.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@SecurityRequirement(name = "bearer-key")
public class OrderController {
}
