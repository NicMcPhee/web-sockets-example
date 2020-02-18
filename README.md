# CSCI 3601 Lab #3 - Angular and Spark Lab

[![Server Build Status](../../workflows/Server%20Java/badge.svg?branch=master)](../../actions?query=workflow%3A"Server+Java")
[![Client Build Status](../../workflows/Client%20Angular/badge.svg?branch=master)](../../actions?query=workflow%3A"Client+Angular")
[![End to End Build Status](../../workflows/End-to-End/badge.svg?branch=master)](../../actions?query=workflow%3AEnd-to-End)

During this lab, you will use a ToDo API like you created in the previous lab
by building a basic client-side application using Angular. This will enable you
to better handle user input and display data returned from the server. As always, 
you'll be expected to make good use of the version control (e.g., branching for features and merging changes to the master branch as appropriate) and project management 
tools available to you: write good commit messages, test things, document issues, etc.

Your specific tasks for this lab can be found in the [LABTASKS.md][labtasks]
file in this repository.

>:warning: One thing to keep in mind is that the Angular developers provide two
major updates to Angular each year. This lab is built using Angular 9. Pay attention to
the version of Angular being used in examples and on-line documentation that you find. Most
of the time, it won't matter very much, but there are times when something you find 
doesn't match what we're doing. If things seem odd, look at the versions for the
example or documentation you're looking at just in case there's a mismatch that matters.

## Setup

As in the previous lab, you'll be using VS Code and GitKraken. Once you've all joined your
group using GitHub classroom, you can clone your repository using the command line or GitKraken:

- From the file menu, choose **Clone Repo**
- Choose GitHub.com in the middle column (as the source location of your repo)
- Browse to the location you'd like to put the local copy of this project repo
- Select the correct repo from the list of repositories
- Select **Clone the repo!**


## Running your project

Now that the structure of the project is a little different, the way we run the project
is different too.

- The familiar **run** Gradle task will still run your Javalin server.
(which is available at ``localhost:4567``)
- The **build** task (or its alias **buildExecutable**) will still _build_ the entire project, but not run it.

The major difference here is that the _client_ side of your project is,
effectively, an entirely separate project from your Javalin server. We've included a full API
for the ToDo's, which you implemented in lab 2, so no need to copy your old project over.

The first time you run your Angular project, you will need to run move into your `client` directory and run `npm install` so that all the dependencies managed by npm will be installed. Once you have successfully run `npm install`, in order to serve up the _client side_ of your project, you will type 
**ng serve**. This will trigger the various tools in the
client side portion of the project to build and host your client side
application on their own little web-server, available by default at ``localhost:4200``. If your server is running, you will be able to see data for users if you navigate to the right place in the project.

## Testing and Continuous Integration

There are now more testing options! You can test the client, or the server or both.

Testing client:

* `ng test` runs the client tests once.
* `ng test --code-coverage` runs the client tests and generates a coverage file you can find in your client directory `client/coverage/client/index.html`.
Right click on `index.html` and select `Copy path` and paste it into your browser of choice. For Chrome users, you can drag and drop `index.html` onto the tab area of Chrome and it will open it.
* `npm run e2e` runs end to end tests. What are e2e tests? They are tests that run the real application and simulate user behavior. They assert that the app is running as expected. NOTE: The server (`./gradlew run`) needs to be actively executing for these tests to work!

There are GitHub Actions set up in your repo for each of the three checks: JUnit tests for the server, Karma tests for the client, and Protractor tests for end-to-end testing. There are badges above that show the status of these checks on the master branch.

## Resources

- [Angular tutorial][angular-tutorial]
- [Angular testing (Karma)][angular-karma]
- [Angular Tour of Heroes tutorial][tour-of-heroes]
- [End-to-end testing (Protractor)][protractor]
- [End to end testing (e2e) with protractor and Angular CLI][e2e-testing]
- [What are environments in Angular CLI?][environments]
- [Angular CLI commands][angular-cli-commands]
- [HTTP Status Codes][status-codes]


[angular-tutorial]: https://angular.io/start
[angular-karma]:https://angular.io/guide/testing
[tour-of-heroes]: https://angular.io/tutorial
[protractor]: https://www.protractortest.org/#/toc
[e2e-testing]: https://coryrylan.com/blog/introduction-to-e2e-testing-with-the-angular-cli-and-protractor
[environments]: https://angular.io/guide/build#configuring-application-environments
[labtasks]: LABTASKS.md
[angular-cli-commands]: https://angular.io/cli
[status-codes]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes


