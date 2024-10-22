package com.project.shopapple.configurations;

import com.project.shopapple.entities.Role;
import com.project.shopapple.filters.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.springframework.http.HttpMethod.*;

@Configuration
//@EnableMethodSecurity
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebMvc
@RequiredArgsConstructor
public class WebSercurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)  throws Exception{
        http
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            .requestMatchers(
                                    String.format("api/users/register"),
                                    String.format("api/users/login")

                            )
                            .permitAll()

                            .requestMatchers(GET,
                                    String.format("api/roles")).permitAll()

                            //category
                            .requestMatchers(GET,
                                    String.format("api/categories/**")).permitAll()

                            //product
                            .requestMatchers(GET,
                                    String.format("api/products/**")).permitAll()

                            .requestMatchers(GET,
                                    String.format("api/products/images/**")).permitAll()

                            //order
                            .requestMatchers(GET,
                                    String.format("api/orders/**")).permitAll()

                            .requestMatchers(GET,
                                    String.format("api/orders/get-orders-by-keyword")).permitAll()

                            //order detail
                            .requestMatchers(GET,
                                    String.format("api/order_details/**")).permitAll()

                            .anyRequest()
                            .authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable);
        http.securityMatcher(String.valueOf(EndpointRequest.toAnyEndpoint()));
        return http.build();
    }
}
