//package mx.com.MunchEZ.MunchEZ.infra.security;
//
//import mx.com.MunchEZ.MunchEZ.domain.Role.Role;
//import mx.com.MunchEZ.MunchEZ.domain.user.User;
//import mx.com.MunchEZ.MunchEZ.domain.user.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class CostumDetailsService implements UserDetailsService {
//
//    private UserRepository userRepository;
//
//    @Autowired
//    public CostumDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(()->new UsernameNotFoundException("User not found with username: "+username));
//        return new User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRole()));
//    }
//
//    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
//        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
//    }
//}
