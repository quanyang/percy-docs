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

If you use [Codeship ParallelCI](https://codeship.com/documentation/continuous-integration/parallelci/) you will need to do some extra configuration to allow Percy to group builds correctly. Along with the variables above, also:

1. Set `PERCY_PARALLEL_TOTAL` to the number of ParallelCI pipelines that will be used for your build. For example, `PERCY_PARALLEL_TOTAL=4`.

<div class="Alert Alert--warning">

**NOTE:** If you change the number of ParallelCI pipelines you use, you will have to manually update `PERCY_PARALLEL_TOTAL`. Codeship does not yet expose an environment variable for the total number of build nodes, so Percy cannot automatically keep this up to date.

If you think Codeship should make this easier for third-party services to integrate, please contact [support@codeship.com](mailto:support@codeship.com) and request that they add expose a `CI_NODE_TOTAL` environment variable so we can make this automatic!

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
