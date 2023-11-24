CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description VARCHAR(200),
    type ENUM('FOOD', 'DRINKS', 'DESSERTS'),
    active TINYINT DEFAULT 1,
    PRIMARY KEY (id)
);