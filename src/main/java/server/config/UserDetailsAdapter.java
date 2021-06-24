package server.config;

import Domain.GameMaster;
import Domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for providing user details (such as the expected password)
 * to the Spring authentication system.
 */
@Service
public class UserDetailsAdapter implements UserDetailsService {

    // TODO: You'll need to inject an object that you can use to get user information.  You may
    // have an existing class that manages a list of users or players or something similar.
    // You can inject that object in the same way that we do with web controllers.  Create 
    // a constructor that takes the object and have the constructor assign it to a private
    // instance variable.

    private GameMaster gm;

    public UserDetailsAdapter (GameMaster gm) {
        this.gm = gm;
    }

    /**
     * This method is called prior to authentication.  This method must determine if the
     * username is valid, and if so, return a UserDetails object containing information
     * about the user (including password).  Your password should include the password
     * hash method prior to the text of the password.  You can use "{noop}" for no hash method.
     * Generally, using no hash method is poor security practice, so we definitely
     * should be using one if this was production code.
     *
     * @param username the username of the user to look up
     * @return the corresponding UserDetails object
     * @throws UsernameNotFoundException if the username is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // TODO: Use your appropriate controller (see above) to find the user by the provided 
        // username.  If not found, throw a UsernameNotFoundException.
        // If it is found, return an instance of UserDetails with the appropriate username and 
        // password.  You can create a UserDetails object using its constructor, or using a 
        // builder as shown in the example below:
        User u;
        try {
            u = gm.users.get(username);
        }catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }



          UserDetails user = org.springframework.security.core.userdetails.User.withUsername(u.getName())
                        //.password("{noop}" + u.getPassword())
                        .password("{noop}secret")
                        .authorities("USER")
                        .build();
        //
        // You can replace "{noop}secret" with your user's password, if you have one, but include the
        // "{noop}" which indicates that no hash method is used.  Too keep things simple you could just
        // use a single password for all users.  Again, if this were production code, we'd use a 
        // good password hash, and we would use complex passwords for each user.
        
        // This is placed here to enable testing.  It allows any username with the password "secret".
        // You should remove this and replace it with code that does an appropriate lookup into your user information.
        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                        .password("{noop}secret")
                        //.password("{noop}" + user.getPassword())
                        .authorities("USER")
                        .build();
    }
}
