# Environment variables

### Required

For authentication, Percy requires the following environment variables to be set:

* `PERCY_TOKEN`: The Percy repo write-only API token. This is different for each Percy repository.
* `PERCY_PROJECT`: The full repository slug, for example `my-org/repo-name`.

<div class="Alert Alert--warning">
  <strong>IMPORTANT: Keep your Percy token secret.</strong> Anyone with access to your token can consume your account quota. They will not be able to read data because the token is write-only.

  See the <strong>Setup</strong> guides for how to securely set environment variables in your CI service.
</div>

### Optional

Percy client libraries pull other information from the environment they are running in, such as the branch name, commit SHA, GitHub Pull Request number, etc. You can override some of Percy's behaviors by setting these these environment variables in your CI environment:

* `PERCY_BRANCH`: The branch the build is being run in. Defaults to the current git branch.
* `PERCY_TARGET_BRANCH`: The branch to compare against. Defaults to `master`.
* `PERCY_COMMIT`: The commit SHA to associate to the build.
* `PERCY_PULL_REQUEST`: The pull request number to associate to the build, if any.


## Setting environment variables

### CI environment

See the **Setup** guides for how to set environment variables in your CI service.

### Local development

You can set environment variables locally using `export`:

```bash
$ export PERCY_TOKEN=aaabbbcccdddeeefff
$ export PERCY_PROJECT=my-org/repo-name
$ # Now run your tests locally:
$ bundle exec rspec
```

Or on one line:

```bash
$ PERCY_ENABLE=1 PERCY_TOKEN=aaabbbcccdddeeefff bundle exec rspec
```

Careful though—if you run your tests locally on your `master` branch, Percy cannot tell the difference between your local environment and your CI environment, so this will set your repo's `master` state in Percy. You can avoid this by simply checking out a different branch, or setting the `PERCY_BRANCH` environment variable.
