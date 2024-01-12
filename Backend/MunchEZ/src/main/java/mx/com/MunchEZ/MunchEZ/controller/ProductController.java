package mx.com.MunchEZ.MunchEZ.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import mx.com.MunchEZ.MunchEZ.domain.order.OrderRepository;
import mx.com.MunchEZ.MunchEZ.domain.product.*;
import mx.com.MunchEZ.MunchEZ.infra.error.IntegrityValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@SecurityRequirement(name = "bearer-key")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;

//    @GetMapping
//    public ResponseEntity<Page<DataListProduct>> listar(@PageableDefault(size = 10, page = 0, sort = {"type"}) Pageable pageable)
//    {
//        var page = ResponseEntity.ok(productRepository.findAll(pageable).map(DataListProduct::new));
//        return ResponseEntity.ok(page.getBody());
//    }

    @GetMapping("/all")
    public ResponseEntity<DataProductByTypeResponse> getAllProductsByType() {
        List<Product> allProducts = productRepository.findAllByActive(Boolean.TRUE);

        List<Product> foodList = new ArrayList<>();
        List<Product> drinksList = new ArrayList<>();
        List<Product> dessertsList = new ArrayList<>();

        for (Product product : allProducts) {
            switch (product.getType()) {
                case FOOD:
                    foodList.add(product);
                    break;
                case DRINKS:
                    drinksList.add(product);
                    break;
                case DESSERTS:
                    dessertsList.add(product);
                    break;
            }
        }

        DataProductByTypeResponse response = new DataProductByTypeResponse(foodList, drinksList, dessertsList);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<DataProductAllResponse> getAllProducts()
    {
        List<Product> allProducts = productRepository.findAll();
        List<Product> foodList = new ArrayList<>();
        List<Product> drinksList = new ArrayList<>();
        List<Product> dessertsList = new ArrayList<>();

        for (Product product : allProducts) {
            switch (product.getType()) {
                case FOOD:
                    foodList.add(product);
                    break;
                case DRINKS:
                    drinksList.add(product);
                    break;
                case DESSERTS:
                    dessertsList.add(product);
                    break;
            }
        }

        DataProductAllResponse response = new DataProductAllResponse(foodList, drinksList, dessertsList);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/drinks")
    public List<Product> getProductsByDrinks()
    {
        return productRepository.findAllByTypeAndActive(Type.DRINKS, Boolean.TRUE);
    }
    @GetMapping("/food")
    public List<Product> getProductsByFood()
    {
        return productRepository.findAllByTypeAndActive(Type.FOOD, Boolean.TRUE);
    }
    @GetMapping("/desserts")
    public List<Product> getProductsByDesserts()
    {
        return productRepository.findAllByTypeAndActive(Type.DESSERTS , Boolean.TRUE);
    }

    @PostMapping
    public ResponseEntity<DataResponseProduct> registerProduct(@RequestBody @Valid DataRegisterProduct dataRegisterProduct, UriComponentsBuilder uriComponentsBuilder)
    {
        Product product = productRepository.save(new Product(dataRegisterProduct));
        DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());

        URI url = uriComponentsBuilder.path("/product").buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataResponseProduct> updateProduct(@PathVariable Long id, @RequestBody @Valid DataUpdateProduct dataUpdateProduct) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Product not found with id: " + id));
        product.updateProduct(dataUpdateProduct);
        productRepository.save(product);
        DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());
        return ResponseEntity.ok(dataResponseProduct);
    }


    @DeleteMapping("/disable/{productId}")
    @Transactional
    public ResponseEntity<DataResponseProduct> deleteProductFromCashierDashboard(@PathVariable Long productId)
    {
        Product product = productRepository.findById(productId).orElseThrow(() -> new IntegrityValidation("Product not found with id: " + productId));
        product.DisableProduct();
        DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());
        return ResponseEntity.ok(dataResponseProduct);
    }

    @DeleteMapping("/delete/{productId}")
    @Transactional
    public ResponseEntity<?> deleteProductFromDataBas(@PathVariable Long productId)
    {
        try
        {
            Product product = productRepository.findById(productId).orElseThrow(() -> new IntegrityValidation("Product not found with id: " + productId));

            if(!orderRepository.findOrdersByProductId(productId).isEmpty())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("cant delete this product because is in a current order.");

            productRepository.delete(product);
            DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());
            return ResponseEntity.ok(dataResponseProduct);
        }catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }

    }
    //Activate product
    @PostMapping("/{id}")
    @Transactional
    public ResponseEntity<DataResponseProduct> activateProduct(@PathVariable Long id)
    {
        Product product = productRepository.findById(id).orElseThrow(() -> new IntegrityValidation("Product not found with id: " + id));
        product.activateProduct();
        productRepository.save(product);
        DataResponseProduct dataResponseProduct = new DataResponseProduct(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getType());
        return ResponseEntity.ok(dataResponseProduct);
    }

}
