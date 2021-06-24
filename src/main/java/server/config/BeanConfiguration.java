package server.config;

import Domain.GameMaster;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    // Add methods here annotated with @Bean to provide injectable objects
    // to web controllers and other classes.

    @Bean
    public GameMaster getGameMaster(){ return new GameMaster(); }
}
