package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/product")
@SecurityRequirement(name = "bearer-key")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<Page<DataListProduct>> listar(@PageableDefault(size = 10, page = 0, sort = {"type"}) Pageable pageable) {
        var page = ResponseEntity.ok(productRepository.findAll(pageable).map(DataListProduct::new));
        return ResponseEntity.ok(page.getBody());
    }

    @GetMapping("/drinks")
    public List<Product> getProdcutsByDrinks() {
        return productRepository.findAllByType(Type.DRINKS);
    }
    @GetMapping("/food")
    public List<Product> getProductsByFood() {
        return productRepository.findAllByType(Type.FOOD);
    }
    @GetMapping("/desserts")
    public List<Product> getProductsByDesserts() {
        return productRepository.findAllByType(Type.DESSERTS);
    }

    @PostMapping
    public ResponseEntity<DataResponseProduct> registerProduct(@RequestBody @Valid DataRegisterProduct dataRegisterProduct, UriComponentsBuilder uriComponentsBuilder) {

        Product product = productRepository.save(new Product(dataRegisterProduct));
        DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());

        URI url = uriComponentsBuilder.path("/product").buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseProduct);
    }
}
