package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mx.com.MunchEZ.MunchEZ.domain.detail.Detail;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "orders")
@Entity(name = "Order")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime data;
    private double total;
    private Boolean active;
    private String num;
    private String name;
    @Enumerated(EnumType.STRING)
    private State state;
    private String description;
    @Enumerated(EnumType.STRING)
    private OrderType ordertype;

    public Order(DataRegisterOrder dataRegisterOrder) {
        this.data = dataRegisterOrder.data();
        this.total = dataRegisterOrder.total();
        this.active = dataRegisterOrder.active();
        this.num = dataRegisterOrder.num();
        this.name = dataRegisterOrder.name();
        this.state = dataRegisterOrder.state();
        this.description = dataRegisterOrder.description();
        this.ordertype = dataRegisterOrder.ordertype();
    }

    public void cancelOrder() {
        this.active = Boolean.FALSE;
        this.state = State.CANCELLED;
    }

    public void deliveredOrder() {
        this.state = State.DELIVERED;
    }

}
