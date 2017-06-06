# Setup: Codeship

[!INCLUDE /docs/setup/-preamble]

## Codeship Basic setup

Codeship provides an easy way to set environment variables in settings for a repository:

https://codeship.com/documentation/continuous-integration/set-environment-variables/

In your Codeship project go to **Settings > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/16673486/6476069e-4463-11e6-9fb5-08cefe5f177a.png)

</div>

## Codeship Pro setup

Codeship Pro is based on Docker and uses an encrypted files to load your environment variables into Docker containers. 

You can learn more about encrypting your environment variables for Codeship Pro builds here: https://documentation.codeship.com/pro/builds-and-configuration/environment-variables/

## More information 

Codeship has more documentation for integrating Percy with your CI/CD builds.

* Codeship Pro: https://documentation.codeship.com/pro/continuous-integration/percy-docker/
* Codeship Basic: https://documentation.codeship.com/basic/continuous-integration/percy-basic/

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

</div>

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
