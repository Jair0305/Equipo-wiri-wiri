package mx.com.MunchEZ.MunchEZ.domain.personal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    private Boolean active;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String phone;

    //Relacion 1 a 1 con la tabla users
    //Elimine username y password de la tabla personal y los puse en la tabla users
    @OneToOne(mappedBy = "personal_id")
    private User user;

    public Personal(DataPersonalRegister dataPersonalRegister) {
        this.name = dataPersonalRegister.name();
        this.active = dataPersonalRegister.active();
        this.role = dataPersonalRegister.role();
        this.phone = dataPersonalRegister.phone();
    }

    public Personal(@NotBlank String username, @NotBlank String password, Long personal_id) {
    }

    public void updatePersonal(DataPersonalUpdate dataPersonalUpdate) {
        this.name = dataPersonalUpdate.name();
        this.active = dataPersonalUpdate.active();
        this.role = dataPersonalUpdate.role();
        this.phone = dataPersonalUpdate.phone();
    }

    public void disablePersonal() {
        this.active = false;
    }
}
