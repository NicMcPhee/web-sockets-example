# Lab Tasks

- Questions that you need to answer (as a team!) are indicated with question
mark symbols (:question:)
- Tasks that specify work to do without a written response will be bulleted
- Remember to set up TravisCI and ZenHub

Write up your answers to these questions in a Google Doc and turn that in via
Canvas on the assignment for this lab.

   * __Make sure that everyone in your group has edit privileges on the document.__
   * __Make sure that the link you turn in gives us at least comment privileges.__
   * __Include the URL of the GitHub repository for your group at the top of the
       GDoc. This will make it easier for us to figure out which team is "Snoozing Llamas".__

Definitely ask if you're ever confused about what you need to do for a given task, or 
what the answer to a question is, etc.

## Exploring the client

The client side of our project has changed since lab #2. The testing is
handled in two new places (Angular spec files for testing Angular and e2e tests) 
with new tools (Jasmine/Karma and Protractor).

:question: Answer questions 1 and 2 in [QUESTIONS](#questions).

## Todo API: Redux

In Lab 2, you worked with your partner to implement an API for requesting
'to-dos' from a server. In this lab, you'll be using a to-do API provided
(as a jar file) with the lab. The API meets the specifications of lab 2 and
can be found at `localhost:4567/api/todos`.

## Writing a beautiful client side application

Now that we have a reliable way to request todo data from our server,
we should write a nice client-side application to help us request and view
this data.

- Use Angular to build a nice client-side interface which:
    - Allows a the user to easily filter search results by status, owner,
      body text, etc.
    - Displays returned todo items in a useful, meaningful way

- Your new functionality should be contained in a 'todos' view, 
with a 'todo-list' component and probably a service.

- You should make some decisions about when to request data from the API,
and when to simply use Angular's filtering tools to change how
the data is displayed. 

   - You have to use Angular's filtering at least once
   - You have to use the server's filtering at least once
   - :question: Make note of why you choose to do each of those two things the way you did
   
:question: Answer question 3 about your filtering

## Remember to test!

Your project should have tests, specifically Karma Angular (client-side) tests, 
and should have working TravisCI integration. You should expand on these tests as
appropriate. 

:bangbang: The bigger piece in this lab, however, are the end-to-end (E2E) tests 
(also known as acceptance tests,
or behavioral tests, or functional tests, or integration tests) which you should
expand to cover all the
key behaviors in your project. 

:question: Answer question 4 about your E2E tests

## Questions

1. :question: How does the navigation menu (with Home and Users) work in this project? Compare `Server.java` 
and `app.routes.ts`. Both do a kind of routing; what does each accomplish and how?
1. :question: What does the `user-list.service.ts` do? Why is it not just done in
the `user-list.component.ts`?
1. You need to use filtering in Angular and filtering on the server each at least one time.
   1. :question: What is one thing you filtered in Angular and why did that approach make sense for that filter?
   1. :question: What is one thing you filtered using the server and why did that approach make sense for that filter?
1. :question: What behaviors did you test via your E2E tests? For each behavior:
   1. :question: Why did you test that particular behavior?
   1. :question: What is the "describe" for that test? (You don't need to tell how the test works since your code will do that)
