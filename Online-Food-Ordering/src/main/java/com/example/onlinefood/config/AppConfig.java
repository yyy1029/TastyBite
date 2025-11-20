package com.example.onlinefood.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

       // Set access permissions for some ports
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll())
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(configurationSource()))
                .headers(headers -> headers.addHeaderWriter((request, response) -> {
                    response.setHeader("X-Frame-Options", "SAMEORIGIN");
                }));

        return http.build();
    }


    private CorsConfigurationSource configurationSource() {
        return new CorsConfigurationSource() {
            // Cross-domain request policy Settings
            
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();

                // Allow the two domains to interact with http requests
                cfg.setAllowedOrigins(Arrays.asList( 
                        "http://127.0.0.1:3000", // Front-end page deployment
                        "http://localhost:8080" ) // The back-end API is deployed locally
                );
                // Sets the allowed HTTP request methods in this case all get/post....
                cfg.setAllowedMethods(Collections.singletonList("*"));
                // Setting specifies whether identity credentials (such as cookies, HTTP authentication information) are allowed to be sent to the server
                cfg.setAllowCredentials(true);
                // All request headers are allowed to be sent
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                // The response to the precheck request is valid for 3600 seconds
                cfg.setMaxAge(3600L);
                return cfg;
            }
        };
    }


    // After the user has registered, the database will store the user password in an encrypted way
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
