package umm3601.user;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.HashMap;

import org.junit.jupiter.api.Test;

/**
 * Tests umm3601.user.Database listUser functionality
 */
public class FullUserListFromDB {

  @Test
  public void totalUserCount() throws IOException {
    Database db = new Database("/users.json");
    User[] allUsers = db.listUsers(new HashMap<>());
    assertEquals(10, allUsers.length, "Incorrect total number of users");
  }

  @Test
  public void firstUserInFullList() throws IOException {
    Database db = new Database("/users.json");
    User[] allUsers = db.listUsers(new HashMap<>());
    User firstUser = allUsers[0];
    assertEquals("Connie Stewart", firstUser.name, "Incorrect name");
    assertEquals(25, firstUser.age, "Incorrect age");
    assertEquals("OHMNET", firstUser.company, "Incorrect company");
    assertEquals("conniestewart@ohmnet.com", firstUser.email, "Incorrect e-mail");
  }
}
