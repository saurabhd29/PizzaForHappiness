package com.sunbeam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude = SecurityAutoConfiguration.class)
public class Project2Application {

	public static void main(String[] args) {
		SpringApplication.run(Project2Application.class, args);
	}

	
	
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//	
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**")
//				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//				.allowedHeaders("*")
//				.allowedOrigins("http://localhost:3000");
//			}
//		};
	
}

