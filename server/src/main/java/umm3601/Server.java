package umm3601;

import java.io.IOException;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import umm3601.user.Database;
import umm3601.user.UserController;

public class Server {

  public static final String CLIENT_DIRECTORY = "../client";
  public static final String USER_DATA_FILE = "/users.json";
  private static Database userDatabase;

  public static void main(String[] args) {

    // Initialize dependencies
    UserController userController = buildUserController();

    Javalin server = Javalin.create(config -> {
      // This tells the server where to look for static files,
      // like HTML and JavaScript.
      config.addStaticFiles(CLIENT_DIRECTORY, Location.EXTERNAL);
      // The next line starts the server listening on port 4567.
    }).start(4567);

    // Simple example route
    server.get("/hello", ctx -> ctx.result("Hello World"));

    // Redirects to create simpler URLs
    server.get("/users", ctx -> ctx.redirect("/users.html"));
    server.get("/todos", ctx -> ctx.redirect("/todos.html"));

    // API endpoints

    // Get specific user
    server.get("api/users/:id", ctx -> userController.getUser(ctx));

    // List users, filtered using query parameters
    server.get("api/users", ctx -> userController.getUsers(ctx));
  }

  /***
   * Create a database using the json file, use it as data source for a new
   * UserController
   *
   * Constructing the controller might throw an IOException if there are problems
   * reading from the JSON "database" file. If that happens we'll print out an
   * error message exit the program.
   */
  private static UserController buildUserController() {
    UserController userController = null;

    try {
      userDatabase = new Database(USER_DATA_FILE);
      userController = new UserController(userDatabase);
    } catch (IOException e) {
      System.err.println("The server failed to load the user data; shutting down.");
      e.printStackTrace(System.err);

      // Exit from the Java program
      System.exit(1);
    }

    return userController;
  }
}
