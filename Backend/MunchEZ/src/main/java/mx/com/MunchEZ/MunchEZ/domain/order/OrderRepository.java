package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.transaction.Transactional;
import mx.com.MunchEZ.MunchEZ.domain.product.Product;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAll();
    List<Order> findAllByStateAndActive(State state, Boolean active);

    @Query("SELECT DISTINCT d.order FROM Detail d WHERE d.product.id = :productId")
    List<Order> findOrdersByProductId(@Param("productId") Long productId);

    List<Order> findAllByOrderByData();

    @Modifying
    @Transactional
    void deleteByDataBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

}