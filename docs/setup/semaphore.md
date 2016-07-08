# Setup: Semaphore

[!INCLUDE /docs/setup/-preamble]

## Semaphore project setup

Semaphore provides an easy way to set environment variables in settings for a repository:

https://semaphoreci.com/docs/exporting-environment-variables.html

In your Semaphore project go to **Settings > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/16673396/a28f635e-4462-11e6-84a5-9d32ef69d0e7.png)

</div>

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

Make sure _"Encrypt content"_ is checked.

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
