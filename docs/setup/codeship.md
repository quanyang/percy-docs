# Setup: Codeship

[!INCLUDE /docs/setup/-preamble]

## Codeship project setup

Codeship provides an easy way to set environment variables in settings for a repository:

https://codeship.com/documentation/continuous-integration/set-environment-variables/

In your Codeship project go to **Settings > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/16673486/6476069e-4463-11e6-9fb5-08cefe5f177a.png)

</div>

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

</div>

## ParallelCI support

<i>Updated: August 2016</i>

Percy now supports ParallelCI and will automatically merge snapshots from pipelines into a single Percy build.

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
