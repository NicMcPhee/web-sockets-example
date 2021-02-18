package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;

import umm3601.user.UserController;

public class Server {

  static String appName = "CSCI 3601 Iteration Template";

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    // The `try/finally` ensures that the mongoClient is closed even if
    // some exception occurs in the process of setting up the client.
    MongoClient mongoClient = null;
    try {
    mongoClient = MongoClients.create(
      MongoClientSettings.builder()
      .applyToClusterSettings(builder ->
        builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      .build());
    } finally {
      if (mongoClient != null) {
        mongoClient.close();
      }
    }

    // Get the database
    MongoDatabase database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies
    UserController userController = new UserController(database);

    Javalin server = Javalin.create().start(4567);

    // Utility routes
    server.get("/api", ctx -> ctx.result(appName));

    // List users, filtered using query parameters
    server.get("/api/users", userController::getUsers);

    // Get the specified user
    server.get("/api/users/:id", userController::getUser);

    // Delete the specified user
    server.delete("/api/users/:id", userController::deleteUser);

    // Add new user with the user info being in the JSON body
    // of the HTTP request
    server.post("/api/users/new", userController::addNewUser);

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
      ctx.json(e); // you probably want to remove this in production
    });
  }
}
