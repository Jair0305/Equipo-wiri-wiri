package mx.com.MunchEZ.MunchEZ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MunchEzApplication {

	public static void main(String[] args) {

		SpringApplication.run(MunchEzApplication.class, args);
	}

}
