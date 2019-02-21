# Lab Tasks

- Questions that you need to answer (as a group!) are indicated with question
mark symbols (:question:).
- Tasks that specify work to do without a written response will be bulleted.

Responses to questions should be submitted as specified by your instructor.

Definitely ask if you're ever confused about what you need to do for a given task, or what the answer to a question is, etc.

## Exploring the project

Look over the directory structure of the project before you start making
changes to it. Note that the structure has changed significantly since
the previous lab!

Answer questions 1 and 2 in [QUESTIONS](#questions).

### Exploring the client

The client side of our project has moved since lab #2, the testing is
now being handled in a different way, and we've introduced several new tools
to help us with client-side development.

Answer questions 3 and 4 in [QUESTIONS](#questions).

### Exploring the server

The server in this case is all tucked inside a `jar` file and moved to a new
directory. In the next lab you'll get to revisit the server code.

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

   - You have to use Angular's filtering at least once.
   - You have to use the server's filtering at least once.
   - Make note of why you choose to do things the way you did.

## Remember to test!

Your project should have tests, specifically Karma Angular (client-side) tests, 
and should have working TravisCI integration. You should expand on these tests as
appropriate.

:bangbang: The bigger piece in this lab, however, are the end-to-end (E2E) tests 
(also known as acceptance tests,
or behavioral tests, or functional tests, or integration tests) which you should
expand to cover all the
key behaviors in your project.

You should create a `TESTCOVERAGE.md` document where you outline:

   * The key behaviors you tested via your E2E tests
   * _Why_ and _where_ you tested those behaviors
      * You don't need to go into the _how_ here – that info is in your code.

## Questions

1. :question: Notice anything new in our ``.gitignore``? There are actually
multiple ``.gitignore`` files in this project. Where are they?
Why might we have more than one, and how do they interact?
1. :question: Note also that there are now multiple ``build.gradle`` files
as well! Why is this?
1. :question: How does the navigation menu (with Home and Users) work in this project? Compare `Server.java` and `app.routes.ts`. Both do a kind of routing; what does each accomplish and how?
1. :question: What does the `user-list.service.ts` do? Why is it not just done in
the `user-list.component.ts`?
