package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAll();
    List<Order> findAllByStateAndActive(State state, Boolean active);

    List<Order> findAllByOrderByData();

    @Modifying
    @Transactional
    void deleteByDataBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

}