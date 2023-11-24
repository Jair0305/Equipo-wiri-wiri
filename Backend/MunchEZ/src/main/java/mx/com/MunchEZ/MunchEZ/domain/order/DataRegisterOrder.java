package mx.com.MunchEZ.MunchEZ.domain.order;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mx.com.MunchEZ.MunchEZ.domain.detail.DataRegisterDetail;

import java.time.LocalDateTime;
import java.util.List;

public record DataRegisterOrder(@NotNull State state, @NotNull LocalDateTime data, @NotNull double total, @NotNull boolean active, @NotBlank String num, @NotBlank String name, @NotNull List<DataRegisterDetail> details, String description, @NotNull OrderType ordertype) {
    public List<DataRegisterDetail> details() {
        return details;
    }
}
