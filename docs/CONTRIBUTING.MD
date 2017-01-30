# CONTRIBUTING

Please follow these general guidelines when making a pull request:

https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github

Before merging into master, ensure the following tasks complete successfully:

````bash

npm test

npm run lint

npm run dist

````

## Single Atomic Commit Message

For commits to grid, I'll always recommend that simple MR's (like this one) be squashed into a single commit, here's an [excerpt](https://egghead.io/lessons/javascript-how-to-squash-multiple-git-commits?course=how-to-contribute-to-an-open-source-project-on-github) that explains this process.

Often, project maintainers prefer that a single pull request be represented by a single commit. It makes the git history cleaner and easier to understand. So before your pull request is merged you’ll want to do an interactive git rebase to squash all of your commits and fix your commit message.
