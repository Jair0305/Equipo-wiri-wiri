package mx.com.MunchEZ.MunchEZ.dto;

import lombok.Data;
import mx.com.MunchEZ.MunchEZ.domain.user.UserEntity;

@Data
public class AuthResponseDTO {

    private UserEntity user;
    private String jwt;

    public AuthResponseDTO(){
        super();
    }

    public AuthResponseDTO(UserEntity user, String jwt){
        this.user = user;
        this.jwt = jwt;
    }
    public AuthResponseDTO(String jwt) {
        this.jwt = jwt;
    }

    public UserEntity getUser(){
        return this.user;
    }

    public void setUser(UserEntity user){
        this.user = user;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }
}
