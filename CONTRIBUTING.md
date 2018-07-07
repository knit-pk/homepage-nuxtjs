# Contributing
You may find here frequently asked questions about contribution to our projects.

## Conventions

- [Branches](/docs/branches-naming-conventions.org)
- [Components](/docs/branches-naming-conventions.org)
- [Package manager](/docs/package-manager.org)

## FAQ

- [How can I make my first contribution?](#how-can-i-make-my-first-contribution)
- [How can I rebase my pull request branch properly?](#how-can-i-rebase-my-pull-request-branch-properly)
- [Should I merge my pull request with `squash` or `rebase` option?](#should-i-merge-my-pull-request-with-squash-or-rebase-option)
- [How can I use commitizen?](#how-can-i-use-commitizen)
- [How can I update my pull request?](#how-can-i-update-my-pull-request)

### How can I make my first contribution?

  First read our [convetions](#conventions). Then follow this steps:

  1. Clone repository to your computer
      ```bash
      $ git clone https://github.com/knit-pk/homepage-nuxtjs.git knit-homepage 
      $ cd ./knit-homepage

      # Make sure you always develop new features on develop
      $ git checkout develop
      ```
  2. Install project dependecies 
      ```bash
      $ yarn
      $ cp .env.example .env
      ```
      (Optionally) Check whether project works
      ```bash
      $ yarn dev # then browser should be opened with application running
      ```
  3. Make desired changes
  4. Create branch
      ```bash
      $ git checkout -b YOUR_BRANCH_NAME
      ```
  5. Make commit with your changes
      ```bash
      $ yarn commit
      ```
      Note: You can create commits using `git commit` too, but please remember we're using commitizen [commitizen](https://github.com/commitizen/cz-cli) with [angular commit message convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular). If you're not familliar with it, please check it out first.

  6. If you are in organization you're able to push to origin repository:
      ```bash
      $ git push origin YOUR_BRANCH_NAME
      ```
      Note: if you're not in organization, you still can contribute. You just have to fork repository first and after push branch to your fork, you'll be able then to create PR to this repository. See: https://help.github.com/articles/creating-a-pull-request-from-a-fork/

  7. Create pull request to `develop` branch, wait for status checks to complete and for feedback. When you'll pass review, we'll sqash your pull request.
    
      Note: Make sure your branch is up to date with `develop` branch. Otherwise you have to rebase your branch with up-to-date develop branch.

### How can I rebase my pull request branch properly?

  Whenever anything is pushed to `develop` branch, you'll probably need to update yours PR branch.

  To update your branch we enforce using `rebase`, you can follow this steps to make sure you'll do this properly:

  1. First make sure you have up-to-date `develop` branch
      ```bash
      $ git checkout develop
      $ git fetch --all
      $ git pull
      ```
  2. Now rebase your branch
      ```bash
      $ git checkout YOUR_BRANCH_NAME
      $ git rebase develop
      ```
  3. (optional) If you encouter any conflicts you must resolve them first, then:
      ```bash
      $ git rebase --continue
      ```
  4. Verify whether you've rebased correctly
      ```bash
      $ git log
      ```

      You'll now it's ok, when your commits from your branch are on top, and bellow it are from develop branch


  5. Make sure you have up-to-date dependencies
      ```bash
      yarn
      ```

  6. Test application
      ```bash
      $ yarn lint
      $ yarn test
      $ yarn dev
      ```

  7. Then you can force push to your branch
      ```bash
      $ git push origin YOUR_BRANCH_NAME --force
      ```

### Should I merge my pull request with `squash` or `rebase` option?

Note: There is no `Merge` option here, because GitHub always tries to merge using `-no-ff` option, which always create `Merge commit` which is useless, and obscures git history. (If you still don't understand there are some bad examples, and try to deciper commit order: [git](https://github.com/git/git/commits/master), [symfony](https://github.com/symfony/symfony/commits/master), [webpack](https://github.com/webpack/webpack/commits/master))

#### Rebase
Rebase is prefered when you have at least two miningful commits with different scopes for example:

- chore(deps): Add dependency which will be used in new article feature
- feat(article): New compontent regarding articles
- docs(article): Document usage of new component

Then when you rebase, all commits will be push on top of the `develop` branch, in time of merging, in the right order.

#### Squash

It should be considered as a default option, i.e. if you don't know what to do use squash to merge feature/bugfix PR.

Squash combines all the commits in PR and then adds one commit on top of develop branch.

Checkout GitHub documentation for more informations: [Merging a pull request](https://help.github.com/articles/merging-a-pull-request/)

### How can I use commitizen?

Commitizen is a [tool](https://github.com/commitizen/cz-cli) that provides a nice flow helping us to keep track of changes in project, by generating [CHANGELOG](CHANGELOG.md) and release notes.

Recommended way is to use `yarn commit` script:

![yarn commit](/docs/doc-pics/yarn_commit.png)

However you still can [install commitizen globally](https://github.com/commitizen/cz-cli#installing-the-command-line-tool)
or write commit messages directly with using [angular commit message convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

### How can I update my pull request?

After initially pushing to your pull request branch, you should use ```git commit --amend```

![git commit --amend](/docs/doc-pics/git_commit_ammend.png)

 and then push it to your branch with ```--force``` option, which also provides you a way to update your initial commit messages. 

 ![git push --force](/docs/doc-pics/git_push_force.png)
 
 You can also push new commits to the pull request branch, but only if they'll follow angular naming convention and targets diffrent scope, so pull request can be merged using rebase option. 
 
 If your commits won't follow commit message convention rules, we'll squash them into one.
