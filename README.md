!["Broken" badge to remind us to fix the URLs on the "real" badges](https://img.shields.io/badge/FIX_BADGES-Badges_below_need_to_be_updated-red)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> **Make sure you update the links for the badges below so they point
> to _your_ project and not the "starter" copy. You also need to make
> sure that analysis checks are being run on all pull requests.** See
> [`CODE-QUALITY-CHECKS.md`](CODE-QUALITY-CHECKS.md)
> for info on how to do that.
>
> Feel free to remove the badge above and this text when you've
> dealt with that.
# CSCI 3601 Iteration Template <!-- omit in toc -->

[![Server Build Status](../../actions/workflows/server.yml/badge.svg)](../../actions/workflows/server.yml)
[![Client Build Status](../../actions/workflows/client.yaml/badge.svg)](../../actions/workflows/client.yaml)
[![End to End Build Status](../../actions/workflows/e2e.yaml/badge.svg)](../../actions/workflows/e2e.yaml)

[![BCH compliance](https://bettercodehub.com/edge/badge/UMM-CSci-3601/3601-iteration-template?branch=main)](https://bettercodehub.com/)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/UMM-CSci-3601/3601-iteration-template.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/UMM-CSci-3601/3601-iteration-template/alerts/)

- [Development](#development)
  - [Common commands](#common-commands)
- [Deployment](#deployment)
- [Resources](#resources)
- [Contributors](#contributors)
- [Changing the name](#changing-the-name)

This is your starter code for Iteration 1.

There are a number of pieces in this production template to help you get started. As you work on your project, you should replace some of these pieces with elements of your project and remove whatever you don't need (e.g., markdown files, JSON data files, or any remnants of the labs). We include, for example, the users parts of the
previous labs. These are almost certainly not relevant to your project
and should be removed once you've started.

:exclamation: You should remove this sentence and the text above, and
replace them with least an elevator pitch description of your project so that
if someone comes to this repo they'll know what the project is about.

## [Development](DEVELOPMENT.md)

Instructions on setting up the development environment and working with the code are in [the development guide](DEVELOPMENT.md).

### Common commands

From the `server` directory:
- `./gradlew run` to start the server
- `./gradlew test` to test the server

From the `client` directory:
- `ng serve` to run the client
- `ng test` to test the client
- `ng e2e` and `ng e2e --watch` to run end-to-end tests

From the `database` directory:
- `./mongoseed.sh` (or `.\mongoseed.bat` on Windows) to seed the database

## [Deployment](DEPLOYMENT.md)

Instructions on how to create a DigitalOcean Droplet and setup your project are in [the deployment guide](DEPLOYMENT.md).

## [Resources](RESOURCES.md)

Additional resources on tooling and techniques are in [the resources list](RESOURCES.md).

## Contributors

This contributors to this project can be seen [here](../../graphs/contributors).
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kklamberty"><img src="https://avatars.githubusercontent.com/u/2751987?v=4?s=100" width="100px;" alt=""/><br /><sub><b>K.K. Lamberty</b></sub></a><br /><a href="https://github.com/UMM-CSci-3601/3601-iteration-template/commits?author=kklamberty" title="Code">💻</a> <a href="#content-kklamberty" title="Content">🖋</a> <a href="https://github.com/UMM-CSci-3601/3601-iteration-template/commits?author=kklamberty" title="Documentation">📖</a> <a href="#design-kklamberty" title="Design">🎨</a> <a href="#ideas-kklamberty" title="Ideas, Planning, & Feedback">🤔</a> <a href="#mentoring-kklamberty" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-kklamberty" title="Project Management">📆</a> <a href="#question-kklamberty" title="Answering Questions">💬</a> <a href="https://github.com/UMM-CSci-3601/3601-iteration-template/commits?author=kklamberty" title="Tests">⚠️</a> <a href="#tutorial-kklamberty" title="Tutorials">✅</a> <a href="#a11y-kklamberty" title="Accessibility">️️️️♿️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Changing the name

The project by default has the name "CSCI 3601 Iteration Template". There are a few places you need to change to make this the name you want:

- The title of this README.md
- [`server/src/main/java/umm3601/Server.java`](server/src/main/java/umm3601/Server.java)
  - The `appName` variable
- [`client/src/app/app.component.ts`](client/src/app/app.component.ts)
  - The `title` variable
  - Also the associated unit and E2E tests will need to be changed.
- [`client/src/app/app.component.html`](client/src/app/app.component.html)
  - The `mat-toolbar` element for the navigation drawer is just "Client" by default.
- [`client/src/index.html`](client/src/index.html)
  - The `title` element

You can go ahead and remove this section of the README once you have changed the name.
