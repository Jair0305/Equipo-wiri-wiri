package mx.com.MunchEZ.MunchEZ.domain.personal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mx.com.MunchEZ.MunchEZ.domain.Role.Role;
import mx.com.MunchEZ.MunchEZ.domain.Role.RoleRepository;
import mx.com.MunchEZ.MunchEZ.domain.user.UserEntity;

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
    private String phone;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public Personal(DataPersonalRegister dataPersonalRegister, RoleRepository roleRepository) {
        this.name = dataPersonalRegister.name();
        this.active = dataPersonalRegister.active();
        this.role = roleRepository.findById(dataPersonalRegister.roleId()).orElseThrow();
        this.phone = dataPersonalRegister.phone();
    }

    public void updatePersonal(DataPersonalUpdate dataPersonalUpdate, RoleRepository roleRepository) {
        this.name = dataPersonalUpdate.name();
        this.active = dataPersonalUpdate.active();
        this.role = roleRepository.findById(dataPersonalUpdate.roleId()).orElseThrow();
        this.phone = dataPersonalUpdate.phone();
    }

    public void disablePersonal() {
        this.active = false;
    }

    public void enablePersonal() {
        this.active = true;
    }
}
