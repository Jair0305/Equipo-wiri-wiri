package mx.com.MunchEZ.MunchEZ.domain.personal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mx.com.MunchEZ.MunchEZ.domain.Role.Role;

public record DataPersonalRegister(@NotBlank String name, @NotNull Long roleId, @NotBlank String phone, @NotNull boolean active){
}
