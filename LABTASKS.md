# Lab Tasks

- Questions that you need to answer (as a team!) are indicated with question
mark symbols (:question:)
- Tasks that specify work to do without a written response will be bulleted
- Remember to set up ZenHub with your stories and estimates

Write up your answers to these questions in a Google Doc and turn that in via
Canvas on the assignment for this lab.

   * __Make sure that everyone in your group has edit privileges on the document.__
   * __Make sure that the link you turn in gives us at least comment privileges.__
   * __Include the URL of the GitHub repository for your group at the top of the GDoc. This will make it easier for us to figure out which team is "Snoozing Llamas".__

Definitely ask if you're ever confused about what you need to do for a given task, or 
what the answer to a question is, etc.

## Exploring the project

The structure of this project should be nearly identical to that of lab #3, and as such there really isn't much excitement in that department.

The server is, for the most part, the same as it has been in the past two labs. The difference to look for here is in how the server gets the data it sends out in reply to requests.

:question: Answer questions 1-7 [QUESTIONS](#questions).

## More Todos!
- Re-implement the ToDo API, this time pulling data from MongoDB rather than from a flat JSON file.
- When displaying the ToDos in your Angular front-end, make thoughtful decisions about whether work like filtering 
should be done in Angular or via database queries. For example, have the database filter out all the ToDos belonging to a single user, 
but let Angular filter by category, body, or status. Do at least some filtering on the database side of things.

### Writing Todos to the Database
- We have included an example of writing to the database with `addUser` functionality. Add to both the front-end and back-end to make it possible to add ToDos so that they appear both in your list and in the database.

### Make it pretty

- Use the Angular Material Design tools you've learned about to build a nice interface for
accessing these APIs:
  - You must use at least two nifty Angular Material features from [here](https://material.angular.io/components/categories)!
  - There are many interesting features and documentation about how to use them - we encourage you to try several

### Continuous Integration

Test, test, and more test! Your project again should have tests. You should continue expanding upon your previous end-to-end tests as well as implement unit testing for both your client-side **and**
the server-side.

- As you work, create a branch for a new feature.
   - Write tests for the server actions for the feature you added (run in the server folder using `./gradlew test` or `./gradlew test jacocoTestReport` as described in [README.md](./README.md#testing-the-server)) 
   - Write unit tests for the new Angular components you are adding using Karma (run in client folder using `ng test` or `ng test --code-coverage` as described in [README.md](./README.md#testing-the-client)) 
   - Write new end-to-end tests for the new views Protractor (run in client folder using `npm run e2e` as described in [README.md](./README.md#end-to-end-testing)) 
   - Address failing builds 
- Use pull requests or work together with your lab partner to 
merge things into master when a feature is working 
and is tested (with passing tests and decent coverage).

## Questions

1. :question: What do we do in the `Server` and `UserController` constructors
to set up our connection to the development database?
1. :question: How do we retrieve a user by ID in the `UserController.getUser(String)` method?
1. :question: How do we retrieve all the users with a given age 
in `UserController.getUsers(Map...)`? What's the role of `filterDoc` in that
method?
1. :question: What are these `Document` objects that we use in the `UserController`? 
Why and how are we using them?
1. :question: What does `UserControllerSpec.clearAndPopulateDb` do?
1. :question: What's being tested in `UserControllerSpec.getUsersWhoAre37()`?
How is that being tested?
1. :question: Follow the process for adding a new user. What role do `UserController` and 
`UserRequestHandler` play in the process?
