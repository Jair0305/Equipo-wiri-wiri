package mx.com.MunchEZ.MunchEZ.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetailDTO {
    private Long productId;
    private String productName;
    private double productPrice;
    private int det_amount;
    private double price;
}
