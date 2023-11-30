package mx.com.MunchEZ.MunchEZ.domain.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByState(State state);

    List<Order> findAllByActive(Boolean active);

    List<Order> findAllByNum(String num);

    List<Order> findAllById(Long id);

    List<Order> findAllByData(LocalDateTime data);

    List<Order> findAllByName(String name);

    List<Order> findAllByStateAndActive(State state, Boolean active);

}