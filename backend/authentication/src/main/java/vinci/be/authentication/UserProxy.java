package vinci.be.authentication;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
@FeignClient(name = "users")
public interface UserProxy {

    @PostMapping("/users")
    void createUser(@RequestBody UserDTO user);
}
