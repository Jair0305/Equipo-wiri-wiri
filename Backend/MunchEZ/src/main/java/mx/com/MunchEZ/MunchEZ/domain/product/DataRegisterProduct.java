package mx.com.MunchEZ.MunchEZ.domain.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataRegisterProduct(@NotBlank String name, @NotNull double price, @NotBlank String description, @NotNull Type type) {
}
