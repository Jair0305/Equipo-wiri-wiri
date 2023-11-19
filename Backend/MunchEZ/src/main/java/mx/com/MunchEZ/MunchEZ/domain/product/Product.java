package mx.com.MunchEZ.MunchEZ.domain.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private int price;
    private String description;

//
//    pro_id INT NOT NULL AUTO_INCREMENT,
//    pro_name VARCHAR(100) NOT NULL,
//    pro_price INT NOT NULL,
//    pro_description VARCHAR(200),
}
