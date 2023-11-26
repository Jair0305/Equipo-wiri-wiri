package mx.com.MunchEZ.MunchEZ.domain.personal;

import mx.com.MunchEZ.MunchEZ.domain.Role.Role;

public record DataListPersonal(Long id, String name, Boolean active, String role, String phone) {
    public DataListPersonal(Personal personal) {
        this(personal.getId(), personal.getName(), personal.getActive(), personal.getRole().getName(), personal.getPhone());
    }
}
