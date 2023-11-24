package mx.com.MunchEZ.MunchEZ.domain.order;

import mx.com.MunchEZ.MunchEZ.domain.detail.DataRegisterDetail;

import java.time.LocalDateTime;
import java.util.List;

public record DataResponseOrder(Long id, State state, LocalDateTime data, double total, Boolean active, String num, String name, String description, OrderType ordertype) {

}
