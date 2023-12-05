package mx.com.MunchEZ.MunchEZ.domain.personal;

import mx.com.MunchEZ.MunchEZ.domain.Role.Role;

public record DataPersonalResponse (Long id, String name, Boolean active, Long roleId, String phone){
}
