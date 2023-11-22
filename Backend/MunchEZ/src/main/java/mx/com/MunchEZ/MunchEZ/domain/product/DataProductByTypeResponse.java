package mx.com.MunchEZ.MunchEZ.domain.product;

import java.util.List;

public record DataProductByTypeResponse(List<Product> food, List<Product> drinks, List<Product> desserts) {
}
