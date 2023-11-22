package mx.com.MunchEZ.MunchEZ.domain.product;

import jakarta.persistence.*;
import lombok.*;
import mx.com.MunchEZ.MunchEZ.domain.detail.Detail;

import java.util.Set;

@Table(name = "products")
@Entity(name = "Product")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String description;
    @Enumerated(EnumType.STRING)
    private Type type;


    public Product(DataRegisterProduct dataRegisterProduct) {
        this.name = dataRegisterProduct.name();
        this.price = dataRegisterProduct.price();
        this.description = dataRegisterProduct.description();
        this.type = dataRegisterProduct.type();
    }
}
