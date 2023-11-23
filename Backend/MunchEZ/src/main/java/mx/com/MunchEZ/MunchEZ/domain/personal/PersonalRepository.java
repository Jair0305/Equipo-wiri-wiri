package mx.com.MunchEZ.MunchEZ.domain.personal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import mx.com.MunchEZ.MunchEZ.domain.personal.Personal;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonalRepository extends JpaRepository<Personal, Long> {
    List<Personal> findAllByActive(Boolean active);
    List<Personal> findAllById(long id);
    List<Personal> findPersonalByRole(Role role);
}

