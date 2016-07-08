# Setup: Circle CI

[!INCLUDE /docs/setup/-preamble]

## Circle project setup

Circle CI provides an easy way to set environment variables in project settings:

https://circleci.com/docs/environment-variables/#setting-environment-variables-for-all-commands-without-adding-them-to-git

In your Circle project, go to **Project settings > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/16672759/1002c8fa-445d-11e6-96fa-ea4f4bd4ea78.png)

</div>

## Alternative circle.yml setup

A different way is to add the environment variables to your `circle.yml`. See the [Circle CI config: Environment](https://circleci.com/docs/configuration/#environment) docs for more info.

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

If your code is public, do not add the PERCY_TOKEN to your code and use the above environment setup instead.

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
