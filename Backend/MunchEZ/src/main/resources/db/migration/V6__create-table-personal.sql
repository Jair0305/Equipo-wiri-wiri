CREATE TABLE IF NOT EXISTS personal(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   phone VARCHAR(20) NOT NULL,
   active TINYINT UNSIGNED,
   role_id INT NOT NULL,
   PRIMARY KEY (id),
   UNIQUE(phone),
   CONSTRAINT fk_personal_role
       FOREIGN KEY (role_id)
           REFERENCES roles(id)
           ON DELETE NO ACTION
           ON UPDATE NO ACTION
);