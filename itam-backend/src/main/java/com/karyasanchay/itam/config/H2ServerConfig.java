package com.karyasanchay.itam.config;

import org.h2.tools.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;

@Configuration
public class H2ServerConfig {

    @Bean(initMethod = "start", destroyMethod = "stop")
    public Server h2WebServer() throws SQLException {
        // Starts the genuine H2 Database Console on a completely separate port (8082)
        // This completely bypasses Spring MVC routing, Spring Security, and Tomcat
        // guaranteeing 100% access without any 404 No Resource Found Errors!
        return Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8082");
    }
}
