package com.met.PizzaForHappiness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude = SecurityAutoConfiguration.class)
public class PizzaForHappinessApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzaForHappinessApplication.class, args);
	}

}
