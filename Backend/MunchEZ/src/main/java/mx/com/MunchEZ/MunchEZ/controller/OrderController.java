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
            OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
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
                        detail.getAmount()
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
    public ResponseEntity<List<DataResponseOrder>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        List<DataResponseOrder> dataResponseOrderList = new ArrayList<>();

        for (Order order : orders) {
            DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName(), order.getDescription(), order.getOrdertype());
            dataResponseOrderList.add(dataResponseOrder);
        }
        return ResponseEntity.ok(dataResponseOrderList);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> deleteOrder(@PathVariable Long id){
        Order order = orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        orderRepository.delete(order);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/cancelorder/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> cancelOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        order.cancelOrder();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deliveredorder/{id}")
    @Transactional
    public ResponseEntity<DataResponseOrder> deliveredOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        order.deliveredOrder();
        return ResponseEntity.ok().build();
    }

}
