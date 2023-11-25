package vinci.be.authentication;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserProxy userProxy;

    public AuthenticationService(UserProxy userProxy) {
        this.userProxy = userProxy;
    }
    public void processUserDetails(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        System.out.println("userRequest = " + userRequest);
        try{
            userProxy.createUser(new UserDTO(oAuth2User.getAttribute("login"), userRequest.getAccessToken().getTokenValue(), "company"));
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
