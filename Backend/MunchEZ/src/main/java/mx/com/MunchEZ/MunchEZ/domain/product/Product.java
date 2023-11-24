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

    public void updateProduct(DataUpdateProduct dataUpdateProduct) {
        if(dataUpdateProduct.name() != null) {
            this.name = dataUpdateProduct.name();
        }
        if(dataUpdateProduct.price() != 0) {
            this.price = dataUpdateProduct.price();
        }
        if(dataUpdateProduct.description() != null) {
            this.description = dataUpdateProduct.description();
        }
        if(dataUpdateProduct.type() != null) {
            this.type = dataUpdateProduct.type();
        }
    }
}
