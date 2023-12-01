package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByState(State state);

    List<Order> findAllByActive(Boolean active);

    List<Order> findAllByNum(String num);

    List<Order> findAllById(Long id);

    List<Order> findAllByData(LocalDate data);

    List<Order> findAllByDataBetween(LocalDate startOfDay, LocalDate endOfDay);

    List<Order> findAllByName(String name);

    List<Order> findAllByStateAndActive(State state, Boolean active);



    @Modifying
    @Transactional
    void deleteByDataBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    void deleteByData(LocalDateTime date);


}