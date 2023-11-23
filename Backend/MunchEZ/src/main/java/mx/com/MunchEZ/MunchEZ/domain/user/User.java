package mx.com.MunchEZ.MunchEZ.domain.user;

import jakarta.persistence.*;
import lombok.*;
import mx.com.MunchEZ.MunchEZ.domain.personal.DataPersonalResponse;
import mx.com.MunchEZ.MunchEZ.domain.personal.Personal;

@Table(name = "users")
@Entity(name = "User")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @OneToOne
    @JoinColumn(name = "personal_id")
    private Personal personal_id;

    public User(DataRegisterUser dataRegisterUser) {
        this.username = dataRegisterUser.username();
        this.password = dataRegisterUser.password();

        this.personal_id = new Personal(dataRegisterUser.personal_id());
    }
}
