# Setup: Travis CI

[!INCLUDE /docs/setup/-preamble]

## Travis repo settings

Travis CI provides an easy way to set environment variables in settings for a repository:

https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings

In your Travis repository go to **Settings > Environment Variables**. Then:

[!INCLUDE /docs/setup/-env-vars-setup-list]

<div style="border: 1px solid #ddd; max-width: 800px; margin-bottom: 1em">

![](https://cloud.githubusercontent.com/assets/75300/16663836/893a5a88-4432-11e6-84cd-30fe98255fa3.png)

</div>

<div class="Alert Alert--warning">

**IMPORTANT: Keep your Percy token secret.** Anyone with access to your token can consume your account quota, though they cannot read data.

For Travis CI, make sure the _"Display value in build log"_ toggle is off.

</div>

## Alternative .travis.yml setup

A slightly more complicated way to set secret environment variables in Travis is to encrypt them and store them in your `.travis.yml`. See the [Travis: Encrypted Variables](https://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables) docs for more info.

[!INCLUDE /docs/setup/-next-step-clients]
[!INCLUDE /docs/-client-list]
