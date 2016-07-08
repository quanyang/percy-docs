# Setup: local development

Percy is designed to integrate with your tests and CI environment, but can also work in local development environments for testing purposes. To enable Percy locally, these environment variables must be configured:

* `PERCY_TOKEN`: The Percy repo write-only API token. This is unique for each Percy repository.
* `PERCY_PROJECT`: The full repository slug, for example `my-org/repo-name`.

## Local setup

You can set environment variables locally using `export`:

```bash
$ export PERCY_TOKEN=aaabbbcccdddeeefff
$ export PERCY_PROJECT=my-org/repo-name
$
$ # Now run your tests locally (just an example, depends on client library used):
$ npm run test
```

Or, all on one line:

```bash
$ PERCY_TOKEN=aaabbbcccdddeeefff PERCY_PROJECT=my-org/repo-name npm run test
```

Careful though—if you run your tests locally, Percy cannot read the current branch information
from the CI environment so it will default to `master` which will set your repo's `master` baseline in Percy. You can change the branch linked in Percy by setting the `PERCY_BRANCH` environment variable.

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
