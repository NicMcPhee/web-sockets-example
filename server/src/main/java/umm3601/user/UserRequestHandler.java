package umm3601.user;

import org.bson.Document;

import io.javalin.http.Context;

/**
 * Created by Brian on 11/29/2017.
 */
public class UserRequestHandler {

  private final UserController userController;

  public UserRequestHandler(UserController userController) {
    this.userController = userController;
  }

  /**
   * Get the single user specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getUser(Context ctx) {
    String id = ctx.pathParam("id", String.class).get();
    User user =  null;
    try {
      user = userController.getUser(id);
    } catch (IllegalArgumentException e) {
      // This is thrown if the ID doesn't have the appropriate
      // form for a Mongo Object ID.
      // https://docs.mongodb.com/manual/reference/method/ObjectId/
      ctx.status(400);
      ctx.result("The requested user id " + id + " wasn't a legal Mongo Object ID.\n" +
        "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
    }
    if (user != null) {
      ctx.status(201);
      ctx.contentType("application/json");
      ctx.json(user);
    } else {
      ctx.status(404);
      ctx.result("The requested user with id " + id + " was not found");
    }
  }

  /**
   * Get a JSON response with a list of all the users.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getUsers(Context ctx) {
    ctx.contentType("application/json");
    ctx.json(userController.getUsers(ctx.queryParamMap()));
  }

  /**
   * Get a JSON response with a list of all the users.
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewUser(Context ctx) {
    ctx.contentType("application/json");

    Document newUser = Document.parse(ctx.body());

    String name = newUser.getString("name");
    int age = newUser.getInteger("age");
    String company = newUser.getString("company");
    String email = newUser.getString("email");
    String role = newUser.getString("role");

    System.err.println("Adding new user [name=" + name + ", age=" + age + " company=" + company + " email=" + email + " role=" + role + ']');
    ctx.result(userController.addNewUser(name, age, company, email, role));
  }
}
