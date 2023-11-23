package mx.com.MunchEZ.MunchEZ.domain.detail;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DataRegisterDetail(@NotNull Long det_ord_id, @NotNull Long det_pro_id, @NotNull int det_amount) {
}
