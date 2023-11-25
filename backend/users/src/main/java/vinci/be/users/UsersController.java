package vinci.be.users;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import vinci.be.users.models.User;

@RestController
public class UsersController {

  private final UsersService service;

  public UsersController(UsersService service) {
    this.service = service;
  }

  @PostMapping("/users/{pseudo}")
  public ResponseEntity<Void> createOne(@PathVariable String pseudo, @RequestBody User user) {
    if (!Objects.equals(user.getPseudo(), pseudo)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    if (user.checkValid()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    boolean created = service.createOne(user);

    if (!created) return new ResponseEntity<>(HttpStatus.CONFLICT);
    else return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @GetMapping("/users/{pseudo}")
  public ResponseEntity<User> readOne(@PathVariable String pseudo) {
    User user = service.readOne(pseudo);

    if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    else return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @PutMapping("/users/{pseudo}")
  public ResponseEntity<User> updateOne(@PathVariable String pseudo, @RequestBody User user) {
    if (!Objects.equals(user.getPseudo(), pseudo)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    if (user.checkValid()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    boolean found = service.updateOne(user);

    if (!found) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    else return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/users/{pseudo}")
  public ResponseEntity<User> deleteOne(@PathVariable String pseudo) {
    boolean found = service.deleteOne(pseudo);

    if (!found) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    else return new ResponseEntity<>(HttpStatus.OK);
  }

}
