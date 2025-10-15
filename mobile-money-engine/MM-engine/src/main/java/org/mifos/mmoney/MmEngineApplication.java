package org.mifos.mmoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//added @s
@EntityScan(basePackages = "org.mifos.mmoney.models")
@EnableJpaRepositories(basePackages = "org.mifos.mmoney.dao")
public class MmEngineApplication {

	public static void main(String[] args) {
		SpringApplication.run(MmEngineApplication.class, args);
	}
}
