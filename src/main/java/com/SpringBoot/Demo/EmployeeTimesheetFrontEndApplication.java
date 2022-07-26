package com.SpringBoot.Demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, SecurityAutoConfiguration.class })
public class EmployeeTimesheetFrontEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeTimesheetFrontEndApplication.class, args);
		System.out.println("--------------------------- Start Application ---------------------------");
		
	}

}
