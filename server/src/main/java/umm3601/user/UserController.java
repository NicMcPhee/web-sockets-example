package umm3601.user;

import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

/**
 * Controller that manages requests for info about users.
 */
public class UserController {

  private Database database;

  /**
   * Construct a controller for users.
   * <p>
   * This loads the "database" of user info from a JSON file and stores that
   * internally so that (subsets of) users can be returned in response to
   * requests.
   *
   * @param database the `Database` containing user data
   */
  public UserController(Database database) {
    this.database = database;
  }

  /**
   * Get the single user specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getUser(Context ctx) {
    String id = ctx.pathParam("id", String.class).get();
    User user = database.getUser(id);
    if (user != null) {
      ctx.json(user);
      ctx.status(201);
    } else {
      throw new NotFoundResponse("No user with id " + id + " was found.");
    }
  }

  /**
   * Get a JSON response with a list of all the users in the "database".
   *
   * @param ctx a Javalin HTTP context
   */
  public void getUsers(Context ctx) {
    User[] users = database.listUsers(ctx.queryParamMap());
    ctx.json(users);
  }

}
