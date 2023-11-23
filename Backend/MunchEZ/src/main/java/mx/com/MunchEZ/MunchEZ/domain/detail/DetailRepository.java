package mx.com.MunchEZ.MunchEZ.domain.detail;

import mx.com.MunchEZ.MunchEZ.domain.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailRepository extends JpaRepository<Detail, Long> {
    List<Detail> findAllByOrder(Order order);
}
