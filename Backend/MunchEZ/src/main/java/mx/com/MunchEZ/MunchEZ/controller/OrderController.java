package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.order.DataRegisterOrder;
import mx.com.MunchEZ.MunchEZ.domain.order.DataResponseOrder;
import mx.com.MunchEZ.MunchEZ.domain.order.Order;
import mx.com.MunchEZ.MunchEZ.domain.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/order")
@SecurityRequirement(name = "bearer-key")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<DataResponseOrder> registerOrder(@RequestBody @Valid DataRegisterOrder dataRegisterOrder, UriComponentsBuilder uriComponentsBuilder)
    {
        Order order = orderRepository.save(new Order(dataRegisterOrder));
        DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName());

        URI url = uriComponentsBuilder.path("/order").buildAndExpand(order.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseOrder);
    }
}
