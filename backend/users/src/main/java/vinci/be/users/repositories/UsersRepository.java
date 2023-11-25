package vinci.be.users.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vinci.be.users.models.User;

@Repository
public interface UsersRepository extends CrudRepository<User, String> {
}