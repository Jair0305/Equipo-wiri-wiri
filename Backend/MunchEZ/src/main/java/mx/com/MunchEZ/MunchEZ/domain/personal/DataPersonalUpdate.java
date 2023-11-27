package mx.com.MunchEZ.MunchEZ.domain.personal;

import mx.com.MunchEZ.MunchEZ.domain.Role.Role;

public record DataPersonalUpdate(String name, Boolean active, Long roleId, String phone) {
}
