package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import org.bson.UuidRepresentation;

import io.javalin.Javalin;
import io.javalin.plugin.bundled.RouteOverviewPlugin;
import io.javalin.http.InternalServerErrorResponse;
import umm3601.user.UserController;

public class Server {

  // The port that the server should run on.
  private static final int SERVER_PORT = 4567;

  public static void main(String[] args) {
    Server server = new Server();

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Set up the MongoDB client
    MongoClient mongoClient = server.configureDatabase(mongoAddr, databaseName);

    // Get the database
    MongoDatabase database = mongoClient.getDatabase(databaseName);

    Javalin javalin = server.configureJavalin(mongoClient, database);

    // Get the user controller.
    // GROUPS SHOULD CREATE THEIR OWN CONTROLLER AND ROUTES FOR WHATEVER
    // DATA THEY'RE WORKING WITH.
    UserController userController = new UserController(database);
    server.setupUserRoutes(javalin, userController);

    javalin.start(SERVER_PORT);
  }

  /**
   * Setup the MongoDB database connection.
   *
   * This "wires up" the database using either system environment variables
   * or default values. If you're running the server locally without any environment
   * variables set, this will connect to the `dev` database running on your computer
   * (`localhost`). If you're running the server on Digital Ocean using our setup
   * script, this will connect to the production database running on server.
   *
   * This sets both the `mongoClient` and `database` fields
   * so they can be used when setting up the Javalin server.
   *
   * @param mongoAddr The address of the MongoDB server
   * @param databaseName The name of the database to use
   * @return The MongoDB client object
   */
  private MongoClient configureDatabase(String mongoAddr, String databaseName) {
    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(MongoClientSettings
      .builder()
      .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      // Old versions of the mongodb-driver-sync package encoded UUID values (universally unique identifiers) in
      // a non-standard way. This option says to use the standard encoding.
      // See: https://studio3t.com/knowledge-base/articles/mongodb-best-practices-uuid-data/
      .uuidRepresentation(UuidRepresentation.STANDARD)
      .build());

    return mongoClient;
  }

  private Javalin configureJavalin(MongoClient mongoClient, MongoDatabase database) {
    /*
     * Create a Javalin server instance. We're using the "create" method
     * rather than the "start" method here because we want to set up some
     * things before the server actually starts. If we used "start" it would
     * start the server immediately and we wouldn't be able to do things like
     * set up routes. We'll call the "start" method later to actually start
     * the server.
     *
     * `plugins.register(new RouteOverviewPlugin("/api"))` adds
     * a helpful endpoint for us to use during development. In particular
     * `http://localhost:4567/api` shows all of the available endpoints and
     * what HTTP methods they use. (Replace `localhost` and `4567` with whatever server
     * and  port you're actually using, if they are different.)
     */
    Javalin server = Javalin.create(config ->
      config.plugins.register(new RouteOverviewPlugin("/api"))
    );

    // Configure the MongoDB client and the Javalin server to shut down gracefully.
    configureShutdowns(mongoClient, server);

    // This catches any uncaught exceptions thrown in the server
    // code and turns them into a 500 response ("Internal Server
    // Error Response"). In general you'll like to *never* actually
    // return this, as it's an instance of the server crashing in
    // some way, and returning a 500 to your user is *super*
    // unhelpful to them. In a production system you'd almost
    // certainly want to use a logging library to log all errors
    // caught here so you'd know about them and could try to address
    // them.
    server.exception(Exception.class, (e, ctx) -> {
      throw new InternalServerErrorResponse(e.toString());
    });

    return server;
  }

  /**
   * Configure the server and the MongoDB client to shut down gracefully.
   *
   * @param mongoClient The MongoDB client
   * @param server The Javalin server instance
   */
  private void configureShutdowns(MongoClient mongoClient, Javalin server) {
    /*
     * We want the server to shut down gracefully if we kill it
     * or if the JVM dies for some reason.
     */
    Runtime.getRuntime().addShutdownHook(new Thread(server::stop));
    /*
     * We want to shut the `mongoClient` down if the server either
     * fails to start, or when it's shutting down for whatever reason.
     * Since the mongClient needs to be available throughout the
     * life of the server, the only way to do this is to wait for
     * these events and close it then.
     */
    server.events(event -> {
      event.serverStartFailed(mongoClient::close);
      event.serverStopped(mongoClient::close);
    });
  }

  /**
   * Setup routes for the `user` collection endpoints.
   *
   * These endpoints are:
   *   - `GET /api/users?age=NUMBER&company=STRING&name=STRING`
   *      - List users, filtered using query parameters
   *      - `age`, `company`, and `name` are optional query parameters
   *   - `GET /api/users/:id`
   *       - Get the specified user
   *   - `DELETE /api/users/:id`
   *      - Delete the specified user
   *   - `POST /api/users`
   *      - Create a new user
   *      - The user info is in the JSON body of the HTTP request
   *
   * The `userController` parameter is an instance of `UserController` which
   * has methods that handle the different endpoints.
   *
   * GROUPS SHOULD CREATE THEIR OWN CONTROLLERS AND ROUTES FOR WHATEVER
   * DATA THEY'RE WORKING WITH.
   *
   * @param server The Javalin server instance
   * @param userController The controller that handles the user endpoints
   */
  private void setupUserRoutes(Javalin server, UserController userController) {
    // List users, filtered using query parameters
    server.get("/api/users", userController::getUsers);

    // Get the specified user
    server.get("/api/users/{id}", userController::getUser);

    // Delete the specified user
    server.delete("/api/users/{id}", userController::deleteUser);

    // Add new user with the user info being in the JSON body
    // of the HTTP request
    server.post("/api/users", userController::addNewUser);
  }
}
