CREATE TABLE products (
    pro_id INT NOT NULL AUTO_INCREMENT,
    pro_name VARCHAR(100) NOT NULL,
    pro_price INT NOT NULL,
    pro_description VARCHAR(200),
    PRIMARY KEY (pro_id)
);