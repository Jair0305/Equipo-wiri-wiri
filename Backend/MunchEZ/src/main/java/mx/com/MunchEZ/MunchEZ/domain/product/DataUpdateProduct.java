package mx.com.MunchEZ.MunchEZ.domain.product;

import jakarta.validation.constraints.NotBlank;

public record DataUpdateProduct(@NotBlank String name,double price,String description) {
}
