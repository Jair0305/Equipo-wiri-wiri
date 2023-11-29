package mx.com.MunchEZ.MunchEZ.dto;

import lombok.Data;
import mx.com.MunchEZ.MunchEZ.domain.user.UserEntity;

@Data
public class LoginDTO {
    UserEntity user;

    public UserEntity getUser(){
        return this.user;
    }

    public LoginDTO(UserEntity user){
        this.user = user;
    }
    public LoginDTO() {
    }
}
