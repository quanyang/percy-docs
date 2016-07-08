# Setup: Drone

[!INCLUDE /docs/setup/-preamble]

## Drone project setup

Drone provides an easy way to set environment variables in the `.drone.yml` config:

http://readme.drone.io/usage/build_test/#environment:fb92aa3346185c57f15afda861d465a3

In your `.drone.yml`, add a section for environment variables:

[!INCLUDE /docs/setup/-env-vars-setup-list]

```yaml
build:
  environment:
    - PERCY_TOKEN=aaabbbcccdddeeefff
    - PERCY_PROJECT=my-org/my-repo
```

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

If your code is public, do not add the PERCY_TOKEN to your code.

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
