package mx.com.MunchEZ.MunchEZ.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.com.MunchEZ.MunchEZ.domain.detail.Detail;
import mx.com.MunchEZ.MunchEZ.domain.order.OrderType;
import mx.com.MunchEZ.MunchEZ.domain.order.State;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailsDTO {
    private Long id;
    private String num;
    private LocalDateTime data;
    private Boolean active;
    private State state;
    private String name;
    private String description;
    private OrderType ordertype;
    private double total;
    private List<DetailDTO> orderDetails;

    public static class OrderDetailInfoDTO {
        private Long productId;
        private int amount;

        private double price;
    }
}
