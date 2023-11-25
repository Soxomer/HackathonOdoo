package vinci.be.authentication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String pseudo;
    private String token;
    private String company;


    public boolean checkValid() {
        return pseudo == null || pseudo.isBlank()
                || token == null || token.isBlank()
                || company == null || company.isBlank();
    }
}


