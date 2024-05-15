package com.backend.soundrentals;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
//@EnableMethodSecurity
public class SoundRentalsApplication {

    private static Logger logger = LoggerFactory.getLogger(SoundRentalsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SoundRentalsApplication.class, args);
        logger.info("SoundRentals is now running...");
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }


}
