# Updating badges and setting up pull request checks <!-- omit in toc -->

* [Updating the badges](#updating-the-badges)
  * [GitHub Actions build statuses](#github-actions-build-statuses)
  * [BetterCodeHub and LGTM badges](#bettercodehub-and-lgtm-badges)
* [Enabling pull request checks](#enabling-pull-request-checks)
  * [BetterCodeHub](#bettercodehub)
  * [LGTM](#lgtm)

The badges at the top of [README.md](README.md) need to be modified

* Every time GitHub Classroom creates a new repo from our starter code
* Every time a group forks or copies a repository from one iteration to another

Essentially anytime a new repository is created, then the badge
URLs will need to be updated. If they are not, then the badges
will reflect the state of the "parent" repository and not the
current repository. This isn't difficult, but it does need to be done and should probably one of the very first "bookkeeping" tasks a team does when setting up their repository.

You will also need to make sure that these services are running checks
whenever you do pull requests. You want to make sure that you're getting
automated checks on every pull request so that you can avoid merging
in checks that would in some way harm the quality of the codebase.

Checklist:

* [ ] Fix BetterCodeHub badge
* [ ] Fix LGTM badge(s)
* [ ] Enable PR checks for BetterCodeHub
* [ ] Enable PR checks for LGTM

## Updating the badges

Below are instructions for each of the different types of badges.

### GitHub Actions build statuses

These badges do not need any changes. The URLs for those badges are
relative to your particular repository (that's what all the `../..` bits
do), so they "automagically" work when your repo is created.

Unfortunately the other badges are going from sources outside of GitHub,
so we can't use the same trick for them.

### BetterCodeHub and LGTM badges

When GitHub Classroom makes the initial copies of this repository, the
[BetterCodeHub](https://bettercodehub.com) (BCH) and
[LGTM](https://lgtm.com) ("looks good to me") badges have several copies
of this string:

```html
UMM-CSci-3601/3601-iteration-template
```

This tells those services to include the badges for the `3601-iteration-template` repository in the `UMM-CSci-3601` organization. You need to update both the organization and the repository name so they match the "name" of your repository up
at the top of your repository page.

* The organization should be changed to whatever the GitHub
  organization is for this semester's course. This is probably
  something like `UMM-CSci-3601-S21`.
* The repository is whatever name you've given your repository,
  like `it-1-stupendous-wombats`.

You then need to change all the instances of

```html
UMM-CSci-3601/3601-iteration-template
```

so they match the name of your repository, e.g.,

```html
UMM-CSci-3601-S21/it-1-stupendous-wombats
```

Once all those are updated, then the badges should point to the
correct analysis and reflect the state of _your_ project. These don't
always update immediately because of browser caching, but if you click
on the badges that should take you to pages on that analysis service that
reflect _your_ project.

## Enabling pull request checks

Below are instructions for enabling pull request checks from
the external services so that your badges will update and
"mean something".

### BetterCodeHub

To enable pull request checks from BetterCodeHub you need to:

1. Go to [BetterCodeHub](https://bettercodehub.com) and login using
   your GitHub account.
2. Choose this semester's organization icon from the set of icons to the
   right of "Your repositories".
3. That should display all the repositories for this semester, which may
   be rather a lot towards the end. Scroll or search to find your
   specific repository.
4. On the bottom left of your repo's card should be the GitHub pull
   request icon. Click that to enable BetterCodeHub pull request checks
   for that repository.

You should then see BetterCodeHub checks on your next pull request on
that project.

### LGTM

To enable pull request checks from LGTM you need to:

1. Go to [LGTM](https://lgtm.com) and login using your GitHub account.
2. Click "Project lists" in the upper right.
3. Type/paste the _full repo URL_ into the "Follow a project from a
   repository host" search bar and press "Follow". That should add your
   repository to the list of repositories that you're following.
4. Click the big green button to the right of the listing for your
   repository to enabled automated PR reviews.

You should then see LGTM checks on your next pull request on
that project.
