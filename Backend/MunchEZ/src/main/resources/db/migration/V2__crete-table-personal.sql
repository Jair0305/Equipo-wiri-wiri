CREATE TABLE IF NOT EXISTS personal(
   per_id INT NOT NULL AUTO_INCREMENT,
   per_name VARCHAR(50) NOT NULL,
   per_position ENUM('CASHIER', 'KITCHEN', 'ADMIN') NOT NULL,
   per_user VARCHAR(20) NOT NULL,
   per_password VARCHAR(14) NOT NULL,
   per_phone_num VARCHAR(20) NOT NULL,
   per_active TINYINT UNSIGNED,
   PRIMARY KEY (per_id),
   UNIQUE(per_user, per_phone_num)
);