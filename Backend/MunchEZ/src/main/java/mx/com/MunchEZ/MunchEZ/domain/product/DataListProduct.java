package mx.com.MunchEZ.MunchEZ.domain.product;

public record DataListProduct(Long id, String name, String description, double price, Type type, Boolean active) {
    public DataListProduct(Product product) {
        this(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getType(), product.getActive());
    }
}
