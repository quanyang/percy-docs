# Environment variables

### Required

For authentication, Percy requires the following environment variables to be set:

* `PERCY_TOKEN`: The Percy repo write-only API token. This is unique for each Percy repository.
* `PERCY_PROJECT`: The full repository slug, for example `my-org/repo-name`.

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota. They will not be able to read data because the token is write-only.

See the **Setup** guides for how to securely set environment variables in your CI service.

</div>

### Optional

Percy client libraries pull other information from the environment they are running in, such as the branch name, commit SHA, GitHub Pull Request number, etc. You can override some of Percy's behaviors by setting these these environment variables in your CI environment:

* `PERCY_BRANCH`: The branch the build is being run in. Defaults to the current git branch.
* `PERCY_TARGET_BRANCH`: The branch to compare against. Defaults to `master`.
* `PERCY_COMMIT`: The commit SHA to associate to the build.
* `PERCY_PULL_REQUEST`: The pull request number to associate to the build, if any.

## Setting environment variables

See the **Setup** guides for how to set environment variables in your CI service or in local development environments.