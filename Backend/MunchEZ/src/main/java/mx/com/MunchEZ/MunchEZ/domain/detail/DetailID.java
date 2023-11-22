package mx.com.MunchEZ.MunchEZ.domain.detail;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.websocket.server.ServerEndpoint;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode(of = {"order", "product"})
@NoArgsConstructor
@AllArgsConstructor
public class DetailID implements Serializable {
    @Column(name = "det_ord_id")
    private Long orderId;

    @Column(name = "det_pro_id")
    private Long productId;
}
