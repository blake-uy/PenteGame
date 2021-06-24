package server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * Configuration for the security of our application.  Here, you can specify
     * which paths require authentication.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Disable these default protections (not a good idea for production code)
        http.cors().and().csrf().disable();

        // Disable session management
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Enables access without authentication to all paths under "/client", and
        // requires authentication for all other paths.  To allow access to additional 
        // paths without authentication,
        // add something like the following after the first "antMatchers" below:
        //
//            .antMatchers("/user/login").permitAll()
        //
        // the above enables access to the path "/user/login" without authentication.
        //
        http.authorizeRequests()
                .antMatchers(
                        "/client/**/*",
                        "/gameMaster/login/*",
                        "/gameMaster/login",
                        "/ws",
                        "/app/**/*",
                        "/favicon.ico"
                ).permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic();


        // This avoids the automatic display of the browser's login dialog
        http.exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setHeader("WWW-Authenticate", "FormBased");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                });
    }
}
