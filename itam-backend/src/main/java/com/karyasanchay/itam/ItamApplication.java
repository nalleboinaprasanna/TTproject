package com.karyasanchay.itam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ItamApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItamApplication.class, args);
	}

}
