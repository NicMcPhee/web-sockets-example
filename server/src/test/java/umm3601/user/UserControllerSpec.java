package umm3601.user;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mongodb.client.MongoClient;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.ArgumentCaptor;

import io.javalin.core.validation.Validator;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;


/**
* Tests the logic of the UserController
*
* @throws IOException
*/
public class UserControllerSpec {

  private Context ctx = mock(Context.class);

  private UserController userController;

  private ObjectId samsId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  @BeforeAll
  public static void setupDB() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setUp() throws IOException {
    ctx.clearCookieStore();


    MongoCollection<Document> userDocuments = db.getCollection("users");
    userDocuments.drop();
    List<Document> testUsers = new ArrayList<>();
    testUsers.add(Document.parse("{\n" +
    "                    name: \"Chris\",\n" +
    "                    age: 25,\n" +
    "                    company: \"UMM\",\n" +
    "                    email: \"chris@this.that\",\n" +
    "                    role: \"admin\",\n" +
    "                    avatar: \"https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon\"\n" +
    "                }"));
    testUsers.add(Document.parse("{\n" +
    "                    name: \"Pat\",\n" +
    "                    age: 37,\n" +
    "                    company: \"IBM\",\n" +
    "                    email: \"pat@something.com\",\n" +
    "                    role: \"editor\",\n" +
    "                    avatar: \"https://gravatar.com/avatar/b42a11826c3bde672bce7e06ad729d44?d=identicon\"\n" +
    "                }"));
    testUsers.add(Document.parse("{\n" +
    "                    name: \"Jamie\",\n" +
    "                    age: 37,\n" +
    "                    company: \"Frogs, Inc.\",\n" +
    "                    email: \"jamie@frogs.com\",\n" +
    "                    role: \"viewer\",\n" +
    "                    avatar: \"https://gravatar.com/avatar/d4a6c71dd9470ad4cf58f78c100258bf?d=identicon\"\n" +
    "                }"));

    samsId = new ObjectId();
    BasicDBObject sam = new BasicDBObject("_id", samsId);
    sam = sam.append("name", "Sam")
      .append("age", 45)
      .append("company", "Frogs, Inc.")
      .append("email", "sam@frogs.com")
      .append("role", "viewer")
      .append("avatar", "https://gravatar.com/avatar/08b7610b558a4cbbd20ae99072801f4d?d=identicon");


    userDocuments.insertMany(testUsers);
    userDocuments.insertOne(Document.parse(sam.toJson()));

    userController = new UserController(db);
  }

  @Test
  public void GETRequestForAllUsers() throws IOException {
    // Call the method on the mock controller
    userController.getUsers(ctx);

    // Confirm that `json` was called with all the users.
    ArgumentCaptor<User[]> argument = ArgumentCaptor.forClass(User[].class);
    verify(ctx).json(argument.capture());
    assertEquals(db.getCollection("users").countDocuments(), argument.getValue().length);
  }

  @Test
  public void GETRequestForAgeUsers() throws IOException {
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put("age", Arrays.asList(new String[] { "37" }));

    when(ctx.queryParamMap()).thenReturn(queryParams);
    userController.getUsers(ctx);

    // Confirm that all the users passed to `json` have age 37.
    ArgumentCaptor<User[]> argument = ArgumentCaptor.forClass(User[].class);
    verify(ctx).json(argument.capture());
    for (User user : argument.getValue()) {
      assertEquals(37, user.age);
    }
  }

  /**
  * Test that if the user sends a request with an illegal value in
  * the age field (i.e., something that can't be parsed to a number)
  * we get a reasonable error code back.
  */
  @Test
  public void GETRequestForUsersWithIllegalAge() {
    // We'll set the requested "age" to be a string ("abc")
    // that can't be parsed to a number.
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put("age", Arrays.asList(new String[] { "abc" }));

    when(ctx.queryParamMap()).thenReturn(queryParams);
    // This should now throw a `BadRequestResponse` exception because
    // our request has an age that can't be parsed to a number.
    assertThrows(BadRequestResponse.class, () -> {
      userController.getUsers(ctx);
    });
  }

  @Test
  public void GETRequestForCompanyUsers() throws IOException {

    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put("company", Arrays.asList(new String[] { "OHMNET" }));

    when(ctx.queryParamMap()).thenReturn(queryParams);
    userController.getUsers(ctx);

    // Confirm that all the users passed to `json` work for OHMNET.
    ArgumentCaptor<User[]> argument = ArgumentCaptor.forClass(User[].class);
    verify(ctx).json(argument.capture());
    for (User user : argument.getValue()) {
      assertEquals("OHMNET", user.company);
    }
  }

  @Test
  public void GETRequestForCompanyAndAgeUsers() throws IOException {

    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put("company", Arrays.asList(new String[] { "Frogs, Inc." }));

    queryParams.put("age", Arrays.asList(new String[] { "37" }));

    when(ctx.queryParamMap()).thenReturn(queryParams);
    userController.getUsers(ctx);

    // Confirm that all the users passed to `json` work for OHMNET
    // and have age 25.
    ArgumentCaptor<User[]> argument = ArgumentCaptor.forClass(User[].class);
    verify(ctx).json(argument.capture());
    for (User user : argument.getValue()) {
      assertEquals(37, user.age);
      assertEquals("Frogs, Inc.", user.company);
    }
  }

  @Test
  public void GETRequestForUserWithExistentId() throws IOException {
    when(ctx.pathParam("id", String.class)).thenReturn(new Validator<String>(samsId.toHexString(), ""));
    userController.getUser(ctx);
    verify(ctx).status(200);
  }

  @Test
  public void GETRequestForUserWithNonexistentId() throws IOException {
    when(ctx.pathParam("id", String.class)).thenReturn(new Validator<String>("nonexistent", ""));
    assertThrows(NotFoundResponse.class, () -> {
      userController.getUser(ctx);
    });
  }
}
