package umm3601.user;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

/**
 * Tests umm3601.user.Database filterUsersByAge and listUsers with _company_ query
 * parameters
 */
public class FilterUsersByCompanyFromDB {

  @Test
  public void filterUsersByComapny() throws IOException {
    UserDatabase db = new UserDatabase("/users.json");
    User[] allUsers = db.listUsers(new HashMap<>());

    User[] OHMNET_Users = db.filterUsersByCompany(allUsers, "OHMNET");
    assertEquals(2, OHMNET_Users.length, "Incorrect number of users with company OHMNET");

    User[] KINETICUT_Users = db.filterUsersByCompany(allUsers, "KINETICUT");
    assertEquals(1, KINETICUT_Users.length, "Incorrect number of users with company KINETICUT");
  }

  @Test
  public void listUsersWithCompanyFilter() throws IOException {
    UserDatabase db = new UserDatabase("/users.json");
    Map<String, List<String>> queryParams = new HashMap<>();

    queryParams.put("company", Arrays.asList(new String[] { "OHMNET" }));
    User[] OHMNET_Users = db.listUsers(queryParams);
    assertEquals(2, OHMNET_Users.length, "Incorrect number of users with company KINETICUT");

    queryParams.put("company", Arrays.asList(new String[] { "KINETICUT" }));
    User[] KINETICUT_Users = db.listUsers(queryParams);
    assertEquals(1, KINETICUT_Users.length, "Incorrect number of users with company KINETICUT");
  }
}
