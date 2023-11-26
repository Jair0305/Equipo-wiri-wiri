//package mx.com.MunchEZ.MunchEZ.infra.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        return http
//                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers(HttpMethod.GET).permitAll()
//                        .anyRequest().authenticated())
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/login")
//                        .permitAll()
//                )
//                .rememberMe(Customizer.withDefaults()).build();
//
//    }
//
//    @Bean
//    public UserDetailsService users()
//    {
//        UserDetails admin = User.builder().username("admin").password("password").roles("ADMIN").build();
//        UserDetails kitchen = User.builder().username("kitchen").password("password").roles("KICHEN").build();
//        UserDetails cashier = User.builder().username("cashier").password("password").roles("CASHIER").build();
//
//        return new InMemoryUserDetailsManager(admin, kitchen, cashier);
//    }
//
//}
