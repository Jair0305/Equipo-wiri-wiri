CREATE TABLE IF NOT EXISTS detail(
     det_ord_id INT NOT NULL,
     det_pro_id INT NOT NULL,
     det_amount INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
     PRIMARY KEY (det_ord_id, det_pro_id),
     CONSTRAINT fk_orders_detail
         FOREIGN KEY (det_ord_id)
             REFERENCES orders(id)
             ON DELETE CASCADE
             ON UPDATE CASCADE,
     CONSTRAINT fk_products_detail
         FOREIGN KEY (det_pro_id)
             REFERENCES products(id)
             ON DELETE NO ACTION
             ON UPDATE NO ACTION
);