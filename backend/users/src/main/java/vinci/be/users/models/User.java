package vinci.be.users.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity(name = "users")
public class User {
  @Id
  @Column(nullable = false)
  private String pseudo;

  @Column(nullable = false)
  private String token;

  @Column(nullable = false)
  private String company;


  public boolean checkValid() {
    return pseudo == null || pseudo.isBlank()
        || token == null || token.isBlank()
        || company == null || company.isBlank();
  }
}
