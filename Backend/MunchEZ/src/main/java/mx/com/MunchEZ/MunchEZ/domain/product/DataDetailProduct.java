package mx.com.MunchEZ.MunchEZ.domain.product;

public record DataDetailProduct(String name, double price, String description, Type type) {

    public DataDetailProduct(Product product) {
        this(product.getName(), product.getPrice(), product.getDescription(), product.getType());
    }
}
