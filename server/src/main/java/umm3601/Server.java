package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;

import umm3601.user.UserController;
import umm3601.user.UserRequestHandler;

public class Server {

  static String appName = "UMM CSci 3601 - Lab 4";

  public static final String USER_DATA_FILE = "/users.json";
  private static MongoDatabase database;

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(
      MongoClientSettings.builder()
      .applyToClusterSettings(builder ->
      builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      .build());

    // Get the database
    database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies
    UserController userController = new UserController(database);
    UserRequestHandler userRequestHandler = new UserRequestHandler(userController);

    Javalin server = Javalin.create().start(4567);

    // Simple example route
    server.get("/hello", ctx -> ctx.result("Hello World"));

    // Redirects to create simpler URLs
    server.get("/users", ctx -> ctx.redirect("/users.html"));

    // Get specific user
    server.get("api/users/:id", ctx -> userRequestHandler.getUser(ctx));

    // List users, filtered using query parameters
    server.get("api/users", ctx -> userRequestHandler.getUsers(ctx));

    // Add new user
    server.post("api/users/new", ctx -> userRequestHandler.addNewUser(ctx));

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
      ctx.json(e);
    });
  }
}
