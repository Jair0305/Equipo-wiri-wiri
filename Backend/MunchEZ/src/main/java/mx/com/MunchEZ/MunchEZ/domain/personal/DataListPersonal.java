package mx.com.MunchEZ.MunchEZ.domain.personal;

public record DataListPersonal(Long id, String name, Boolean active, Role role, String phone) {
    public DataListPersonal(Personal personal) {
        this(personal.getId(), personal.getName(), personal.getActive(), personal.getRole(), personal.getPhone());
    }
}
