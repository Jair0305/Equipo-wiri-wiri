package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DataRegisterOrder(@NotNull State state, @NotNull @Future LocalDateTime data, @NotNull double total, @NotNull boolean active, @NotBlank String num, @NotBlank String name) {
}
