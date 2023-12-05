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
import mx.com.MunchEZ.MunchEZ.infra.error.IntegrityValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.crypto.Data;
import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

    @PostMapping
    public ResponseEntity<DataResponseOrder> registerOrderWithDetails(@RequestBody @Valid DataRegisterOrder dataRegisterOrder, UriComponentsBuilder uriComponentsBuilder) {
        Order order = orderRepository.save(new Order(dataRegisterOrder));

        if (dataRegisterOrder.details() != null) {
            for (DataRegisterDetail dataRegisterDetail : dataRegisterOrder.details()) {
                Product product = productRepository.findById(dataRegisterDetail.det_pro_id())
                        .orElseThrow(() -> new IntegrityValidation("Product not found with id: " + dataRegisterDetail.det_pro_id()));

                DetailID detailId = new DetailID(order.getId(), product.getId());
                Detail detail = new Detail();
                detail.setId(detailId);
                detail.setOrder(order);
                detail.setProduct(product);
                detail.setAmount(dataRegisterDetail.det_amount());
                detail.setPrice(product.getPrice());

                detailRepository.save(detail);
            }
        }
        DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName(), order.getDescription(), order.getOrdertype());

        URI url = uriComponentsBuilder.path("/order/{orderId}").buildAndExpand(order.getId()).toUri();

        return ResponseEntity.created(url).body(dataResponseOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailsDTO>> getOrdersByState() {
        List<Order> orders = orderRepository.findAllByStateAndActive(State.IN_PROCESS, Boolean.TRUE);

        List<OrderDetailsDTO> orderDetailsDTOList = new ArrayList<>();

        for (Order order : orders) {
            List<Detail> orderDetails = detailRepository.findAllByOrder(order);
            OrderDetailsDTO orderDetailsDTO;
            orderDetailsDTO = new OrderDetailsDTO();
            orderDetailsDTO.setId(order.getId());
            orderDetailsDTO.setNum(order.getNum());
            orderDetailsDTO.setName(order.getName());
            orderDetailsDTO.setOrdertype(order.getOrdertype());
            orderDetailsDTO.setDescription(order.getDescription());
            List<DetailDTO> detailDTOList = new ArrayList<>();
            for (Detail detail : orderDetails) {
                DetailDTO detailDTO = new DetailDTO(
                        detail.getProduct().getId(),
                        detail.getProduct().getName(),
                        detail.getProduct().getPrice(),
                        detail.getAmount(),
                        detail.getPrice()
                );
                detailDTOList.add(detailDTO);
            }
            orderDetailsDTO.setOrderDetails(detailDTOList);
            orderDetailsDTOList.add(orderDetailsDTO);
        }
        Collections.sort(orderDetailsDTOList, Comparator.comparing(OrderDetailsDTO::getNum));
        return ResponseEntity.ok(orderDetailsDTOList);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDetailsDTO>> getAllOrdersWithDetails() {
        List<Order> orders = orderRepository.findAll();

        List<OrderDetailsDTO> orderDetailsDTOList = new ArrayList<>();

        for (Order order : orders) {
            List<Detail> orderDetails = detailRepository.findAllByOrder(order);
            OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
            orderDetailsDTO.setId(order.getId());
            orderDetailsDTO.setNum(order.getNum());
            orderDetailsDTO.setName(order.getName());
            orderDetailsDTO.setState(order.getState());
            orderDetailsDTO.setActive(order.getActive());
            orderDetailsDTO.setOrdertype(order.getOrdertype());
            orderDetailsDTO.setDescription(order.getDescription());
            orderDetailsDTO.setOrdertype(order.getOrdertype());
            orderDetailsDTO.setTotal(order.getTotal());
            orderDetailsDTO.setData(order.getData());
            List<DetailDTO> detailDTOList = new ArrayList<>();
            for (Detail detail : orderDetails) {
                DetailDTO detailDTO = new DetailDTO(
                        detail.getProduct().getId(),
                        detail.getProduct().getName(),
                        detail.getProduct().getPrice(),
                        detail.getAmount(),
                        detail.getPrice()
                );
                detailDTOList.add(detailDTO);
            }
            orderDetailsDTO.setOrderDetails(detailDTOList);
            orderDetailsDTOList.add(orderDetailsDTO);
        }

        Collections.sort(orderDetailsDTOList, Comparator.comparing(OrderDetailsDTO::getNum));

        return ResponseEntity.ok(orderDetailsDTOList);
    }

    @DeleteMapping("/deleteperday/{date}")
    public ResponseEntity<String> deleteOrdersForDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        orderRepository.deleteByDataBetween(startOfDay, endOfDay);

        return ResponseEntity.ok("Pedidos eliminados para la fecha: " + date);
    }

    @DeleteMapping("/deleteone/{id}")
    public ResponseEntity<String> deleteOrderById(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return ResponseEntity.ok("Pedido eliminado con id: " + id);
    }

    @DeleteMapping("/cancelorder/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> cancelOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Order not found with id: " + id));
        order.cancelOrder();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deliveredorder/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> deliveredOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Order not found with id: " + id));
        order.deliveredOrder();
        return ResponseEntity.ok().build();
    }

}
