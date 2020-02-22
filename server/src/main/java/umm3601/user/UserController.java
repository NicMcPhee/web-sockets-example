package umm3601.user;

import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about users.
 */
public class UserController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();


  private final MongoCollection<User> userCollection;

  /**
   * Construct a controller for users.
   *
   * @param database the database containing user data
   */
  public UserController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(User.class);
    userCollection = database.getCollection("users").withDocumentClass(User.class).withCodecRegistry(jacksonCodecRegistry);
  }

  /**
   * Helper method that gets a single user specified by the `id`
   * parameter in the request.
   *
   * @param id the Mongo ID of the desired user
   * @return the desired user as a JSON object if the user with that ID is found,
   * and `null` if no user with that ID is found
   */
  public User getUser(String id) {
    System.out.println(id);
    try {
      return userCollection.find(eq("_id", new ObjectId(id).toHexString())).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse();
    }
  }

  /**
   * Helper method which iterates through the collection, receiving all
   * documents if no query parameter is specified. If the age query parameter
   * is specified, then the collection is filtered so only documents of that
   * specified age are found.
   *
   * @param queryParams the query parameters from the request
   * @return an arrayList of Users
   */
  public ArrayList<User> getUsers(Map<String, List<String>> queryParams) {

    Document filterDoc = new Document();

    if (queryParams.containsKey("age")) {
      try {
        int targetAge = Integer.parseInt(queryParams.get("age").get(0));
        filterDoc = filterDoc.append("age", targetAge);
      } catch (NumberFormatException e) {
        throw new BadRequestResponse("Specified age '" + queryParams.get("age").get(0) + "' can't be parsed to an integer");
      }
    }

    if (queryParams.containsKey("company")) {
      String targetContent = (queryParams.get("company").get(0));
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("company", contentRegQuery);
    }

    if (queryParams.containsKey("role")) {
      String targetRole = (queryParams.get("role").get(0));
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetRole);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("role", contentRegQuery);
    }

    //FindIterable comes from mongo, Document comes from Gson
    return userCollection.find(filterDoc).into(new ArrayList<>());
  }

  /**
   * Helper method which appends received user information to the to-be added document
   *
   * @param name the name of the new user
   * @param age the age of the new user
   * @param company the company the new user works for
   * @param email the email of the new user
   * @param role the role of the new user
   * @return boolean after successfully or unsuccessfully adding a user
   */
  public String addNewUser(String name, int age, String company, String email, String role) {

    User newUser = new User();
    newUser._id = new ObjectId().toHexString();
    newUser.name = name;
    newUser.age = age;
    newUser.company = company;
    newUser.email = email;
    newUser.role = role;
    newUser.avatar = "test";

    try {
      userCollection.insertOne(newUser);
      ObjectId id = new ObjectId(newUser._id);
      System.err.println("Successfully added new user [_id=" + id + ", name=" + name + ", age=" + age + " company=" + company + " email=" + email + ']');
      return id.toHexString();
    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }
}
