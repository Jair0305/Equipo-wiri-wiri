package mx.com.MunchEZ.MunchEZ.domain.personal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mx.com.MunchEZ.MunchEZ.domain.user.User;

@Table(name = "personal")
@Entity(name = "Personal")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Personal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String active;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String phone;

    //Relacion 1 a 1 con la tabla users
    //Elimine username y password de la tabla personal y los puse en la tabla users
    @OneToOne(mappedBy = "personal")
    private User user;

}
