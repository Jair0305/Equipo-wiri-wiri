package mx.com.MunchEZ.MunchEZ.domain.detail;

import jakarta.persistence.*;
import lombok.*;
import mx.com.MunchEZ.MunchEZ.domain.order.Order;
import mx.com.MunchEZ.MunchEZ.domain.product.Product;

import java.io.Serializable;
import java.util.Set;

@Table(name = "detail")
@Entity(name = "Detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Detail {
    @EmbeddedId
    private DetailID id;

    @ManyToOne
    @MapsId("det_ord_id")
    @JoinColumn(name = "det_ord_id", insertable = false, updatable = false)
    private Order order;

    @ManyToOne
    @MapsId("det_pro_id")
    @JoinColumn(name = "det_pro_id", insertable = false, updatable = false)
    private Product product;

    @Column(name = "det_amount", nullable = false)
    private int amount;

    @Column(name = "price", nullable = false)
    private double price;
}
