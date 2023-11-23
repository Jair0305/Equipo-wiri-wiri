package mx.com.MunchEZ.MunchEZ.domain.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataRegisterUser(@NotBlank String username, @NotBlank String password) {
}
