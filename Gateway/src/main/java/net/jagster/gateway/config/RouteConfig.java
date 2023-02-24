package net.jagster.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@Order(1)
public class RouteConfig {
    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder
                .routes()
                .route("eurekaRoute", eurekaRoute -> eurekaRoute
                        .path("/eureka")
                        .filters(filter -> filter.setPath("/"))
                        .uri("lb://discovery-service")
                )
                .route("eurekaStaticRoute", eurekaStaticRoute -> eurekaStaticRoute
                        .path("/eureka/**")
                        .uri("lb://discovery-service")
                )
                .route("currencyRoute", currencyRoute -> currencyRoute
                        .path("/currencies/**")
                        .uri("lb://account-service")
                )
                .route("categoryRoute", categoryRoute -> categoryRoute
                        .path("/categories/**")
                        .uri("lb://account-service")
                )
                .route("accountRoute", accountRoute -> accountRoute
                        .path("/accounts/**")
                        .uri("lb://account-service")
                )
                .route("transactionRoute", transactionRoute -> transactionRoute
                        .path("/transactions/**")
                        .uri("lb://account-service")
                )
                .build();
    }
}
