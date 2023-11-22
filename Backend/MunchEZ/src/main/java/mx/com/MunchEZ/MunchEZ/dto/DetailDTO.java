package mx.com.MunchEZ.MunchEZ.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailDTO {
    private Long productId;
    private Long orderId;
    private int det_amount;
    private String description;
}
