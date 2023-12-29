package umm3601;

import io.javalin.Javalin;

public interface Controller {
  /**
   * Add routes for the server.
   *
   * This is where you'll add all the routes for your data, by calling
   * `server.get(...)`, `server.post(...)`, etc.
   *
   * @param server The Javalin server to add routes to
   */
  void addRoutes(Javalin server);
}
