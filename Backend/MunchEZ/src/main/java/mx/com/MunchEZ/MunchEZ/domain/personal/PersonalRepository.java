package mx.com.MunchEZ.MunchEZ.domain.personal;


import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface PersonalRepository extends JpaRepository<Personal, Long> {
    List<Personal> findAllByActive(Boolean active);
    List<Personal> findAllById(long id);
    List<Personal> findPersonalByRole(Role role);
}

