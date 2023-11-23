package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.detail.DataRegisterDetail;
import mx.com.MunchEZ.MunchEZ.domain.detail.Detail;
import mx.com.MunchEZ.MunchEZ.domain.detail.DetailID;
import mx.com.MunchEZ.MunchEZ.domain.detail.DetailRepository;
import mx.com.MunchEZ.MunchEZ.domain.order.*;
import mx.com.MunchEZ.MunchEZ.domain.product.Product;
import mx.com.MunchEZ.MunchEZ.domain.product.ProductRepository;
import mx.com.MunchEZ.MunchEZ.dto.DetailDTO;
import mx.com.MunchEZ.MunchEZ.dto.OrderDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/order")
@SecurityRequirement(name = "bearer-key")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    DetailRepository detailRepository;
    @Autowired
    ProductRepository productRepository;

//----------------------This code is for register Orders Withouth Details, is not util for this aplication, but is a reference----------------------
//    @PostMapping
//    public ResponseEntity<DataResponseOrder> registerOrder(@RequestBody @Valid DataRegisterOrder dataRegisterOrder, UriComponentsBuilder uriComponentsBuilder)
//    {
//        Order order = orderRepository.save(new Order(dataRegisterOrder));
//        DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName());
//
//        URI url = uriComponentsBuilder.path("/order").buildAndExpand(order.getId()).toUri();
//        return ResponseEntity.created(url).body(dataResponseOrder);
//    }

    @PostMapping
    public ResponseEntity<DataResponseOrder> registerOrderWithDetails(@RequestBody @Valid DataRegisterOrder dataRegisterOrder, UriComponentsBuilder uriComponentsBuilder) {
        Order order = orderRepository.save(new Order(dataRegisterOrder));

        if (dataRegisterOrder.details() != null) {
            for (DataRegisterDetail dataRegisterDetail : dataRegisterOrder.details()) {
                Product product = productRepository.findById(dataRegisterDetail.det_pro_id())
                        .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + dataRegisterDetail.det_pro_id()));

                DetailID detailId = new DetailID(order.getId(), product.getId());
                Detail detail = new Detail();
                detail.setId(detailId);
                detail.setOrder(order);
                detail.setProduct(product);
                detail.setAmount(dataRegisterDetail.det_amount());

                detailRepository.save(detail);
            }
        }
        DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName(), order.getDescription());

        URI url = uriComponentsBuilder.path("/order/{orderId}").buildAndExpand(order.getId()).toUri();

        return ResponseEntity.created(url).body(dataResponseOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailsDTO>> getOrdersByState() {
        List<Order> orders = orderRepository.findAllByStateAndActive(State.IN_PROCESS, Boolean.TRUE);

        List<OrderDetailsDTO> orderDetailsDTOList = new ArrayList<>();

        for (Order order : orders) {
            List<Detail> orderDetails = detailRepository.findAllByOrder(order);
            OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
            orderDetailsDTO.setNum(order.getNum());
            orderDetailsDTO.setName(order.getName());
            orderDetailsDTO.setDescription(order.getDescription());

            // Mapea los detalles a DetailDTO y agrega a la lista
            List<DetailDTO> detailDTOList = new ArrayList<>();
            for (Detail detail : orderDetails) {
                DetailDTO detailDTO = new DetailDTO(
                        detail.getProduct().getId(),
                        detail.getAmount());
                detailDTOList.add(detailDTO);
            }

            orderDetailsDTO.setOrderDetails(detailDTOList);

            // Agrega el DTO a la lista
            orderDetailsDTOList.add(orderDetailsDTO);
        }

        return ResponseEntity.ok(orderDetailsDTOList);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> cancelOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        order.cancelOrder();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> deliveredOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        order.deliveredOrder();
        return ResponseEntity.ok().build();
    }

}
