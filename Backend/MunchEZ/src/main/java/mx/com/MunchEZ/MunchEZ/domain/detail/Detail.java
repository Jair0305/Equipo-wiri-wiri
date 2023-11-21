package mx.com.MunchEZ.MunchEZ.domain.detail;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mx.com.MunchEZ.MunchEZ.domain.order.Order;
import mx.com.MunchEZ.MunchEZ.domain.product.Product;

@Table(name = "detail")
@Entity(name = "Detail")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Detail {

    @Id
    @ManyToOne
    @JoinColumn(name = "det_ord_id", referencedColumnName = "id")
    private Order order;

    @Id
    @ManyToOne
    @JoinColumn(name = "det_prod_id", referencedColumnName = "id")
    private Product product;

    private String description;
    private int det_amount;
}
