package vinci.be.users;

import org.springframework.stereotype.Service;
import vinci.be.users.models.User;
import vinci.be.users.repositories.UsersRepository;

@Service
public class UsersService {

  private final UsersRepository repository;

  public UsersService(UsersRepository repository) {
    this.repository = repository;
  }

  /**
   * Creates a new user in repository
   * @param user the information of the user
   * @return true if the user was created, false if another user exists with the same pseudo
   */
  public boolean createOne(User user) {
    if (repository.existsById(user.getPseudo())) return false;
    repository.save(user);
    return true;
  }

  /**
   * Reads a user in repository
   * @param pseudo the pseudo of the user
   * @return the user, or null if the user couldn't be found
   */
  public User readOne(String pseudo) {
    return repository.findById(pseudo).orElse(null);
  }

  /**
   * Updates a user in repository
   * @param user New values of the user
   * @return true if the user was updated, or false if the user couldn't be found
   */
  public boolean updateOne(User user) {
    if (!repository.existsById(user.getPseudo())) return false;
    repository.save(user);
    return true;
  }

  /**
   * Deletes a user from repository
   * @param pseudo the pseudo of the user
   * @return true if the user was deleted, or false if the user couldn't be found
   */
  public boolean deleteOne(String pseudo) {
    if (!repository.existsById(pseudo)) return false;
    repository.deleteById(pseudo);
    return true;
  }

}