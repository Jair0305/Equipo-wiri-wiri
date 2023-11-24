package mx.com.MunchEZ.MunchEZ.domain.product;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataUpdateProduct(@NotNull Long Id, Boolean active, String name, double price, String description, @NotNull Type type) {
}
