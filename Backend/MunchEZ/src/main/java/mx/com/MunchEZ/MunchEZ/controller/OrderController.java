package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.detail.DataRegisterDetail;
import mx.com.MunchEZ.MunchEZ.domain.detail.Detail;
import mx.com.MunchEZ.MunchEZ.domain.detail.DetailID;
import mx.com.MunchEZ.MunchEZ.domain.detail.DetailRepository;
import mx.com.MunchEZ.MunchEZ.domain.order.DataRegisterOrder;
import mx.com.MunchEZ.MunchEZ.domain.order.DataResponseOrder;
import mx.com.MunchEZ.MunchEZ.domain.order.Order;
import mx.com.MunchEZ.MunchEZ.domain.order.OrderRepository;
import mx.com.MunchEZ.MunchEZ.domain.product.Product;
import mx.com.MunchEZ.MunchEZ.domain.product.ProductRepository;
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
                detail.setDescription(dataRegisterDetail.det_description());
                detail.setAmount(dataRegisterDetail.det_amount());

                detailRepository.save(detail);
            }
        }
        DataResponseOrder dataResponseOrder = new DataResponseOrder(order.getId(), order.getState(), order.getData(), order.getTotal(), order.getActive(), order.getNum(), order.getName());

        URI url = uriComponentsBuilder.path("/order/{orderId}").buildAndExpand(order.getId()).toUri();

        return ResponseEntity.created(url).body(dataResponseOrder);
    }
}
