CREATE TABLE usuarios(

    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL ,
    password VARCHAR(300) NOT NULL ,

    personal_id INT NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_users_personal
        FOREIGN KEY (personal_id)
        REFERENCES personal(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);
