package mx.com.MunchEZ.MunchEZ.domain.order;

import java.time.LocalDateTime;

public record DataResponseOrder(Long id, String state, LocalDateTime data, double total, Boolean active, String num, String name) {
}
