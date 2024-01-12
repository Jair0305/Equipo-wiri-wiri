package mx.com.MunchEZ.MunchEZ.domain.product;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByTypeAndActive(Type type, Boolean active);

    List<Product> findAllByActive(Boolean active);
    List<Product> findById(long id);

}
