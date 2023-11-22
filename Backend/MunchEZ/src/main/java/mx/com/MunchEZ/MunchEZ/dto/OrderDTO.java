package mx.com.MunchEZ.MunchEZ.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private LocalDateTime data;
    private double total;
    private boolean active;
    private String num;
    private String name;
    private String state;
    private List<DetailDTO> details;

}
