# Setup: Buildkite

[!INCLUDE /docs/setup/-preamble]

## Buildkite pipeline setup

Buildkite provides an easy way to set environment variables in your build pipeline config or agent hooks:

https://buildkite.com/docs/guides/environment-variables

In your Buildkite pipeline, go to **Settings > Steps > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/18970828/c2ffda48-8647-11e6-8cb2-47cf1673e956.png)

</div>

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

</div>

### Setup for docker-compose

If you use Docker containers in your Buildkite builds, you need to pass some environment variables in to your containers for Percy's client library to detect the environment correctly.

Add this to your `docker-compose.yml`:

```yaml
  environment:
    - BUILDKITE
    - BUILDKITE_COMMIT
    - BUILDKITE_BRANCH
    - BUILDKITE_PULL_REQUEST
    - BUILDKITE_BUILD_ID
    - PERCY_TOKEN
    - PERCY_PROJECT
```

By leaving the value blank, Docker will pass through the value from the host Buildkite environment.

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
