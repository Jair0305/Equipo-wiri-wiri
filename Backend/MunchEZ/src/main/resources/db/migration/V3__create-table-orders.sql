CREATE TABLE IF NOT EXISTS orders(
     ord_id INT NOT NULL AUTO_INCREMENT,
     ord_num INT NOT NULL,
     ord_data DATETIME NOT NULL,
     ord_name VARCHAR(40) NOT NULL,
     ord_state ENUM('DELIVERED', 'IN PROCESS') NOT NULL,
     per_active TINYINT UNSIGNED NOT NULL,
     ord_total DECIMAL(10, 2) NOT NULL,
     PRIMARY KEY (ord_id)
);