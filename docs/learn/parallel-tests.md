# Parallel test suites

Percy has built-in support for complex test suites that run in parallelized CI services or parallel test runners.

Percy is **designed to support _any_ parallelized test environment** with only two simple parameters. Snapshots are pushed from your tests to Percy and grouped in the same Percy build, no matter if your tests are run in different processes or even on different machines.

If you currently see multiple Percy builds created incorrectly each time your tests run (with different snapshots in each build), this article is for you.

## Usage

Depending on your CI service, you may need to do some simple configuration to support parallel tests.

* **Automatically supported** when using the Percy client libraries:

  * CircleCI parallelism
  * Travis CI parallel builds
  * Codeship ParallelCI

* **Manual configuration:**

  * [parallel_tests](https://github.com/grosser/parallel_tests) gem
  * Jenkins, Drone, others

### Manual configuration with environment variables

Two environment variables must be configured to support parallel test suites: a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), and the total number of parallel nodes.

* `PERCY_PARALLEL_NONCE`: A unique identifier for this build. This can be anything, but it must be the same across parallel build nodes. Usually this is just the CI build number or a shared timestamp.
* `PERCY_PARALLEL_TOTAL`: The total number of parallel build nodes.

These are the only variables needed for Percy to correctly support your parallelized test suite.

### Example: parallel_tests gem

For example, if you are using the [parallel_tests gem](https://github.com/grosser/parallel_tests) with RSpec, you may run your tests like this:

```bash
$ rake parallel:spec[4] 4 processes for 100 specs, ~ 25 specs per process ...
```

We can modify this to export the two environment variables:

```bash
$ export PERCY_PARALLEL_NONCE=`date +%s`
$ export PERCY_PARALLEL_TOTAL=4
$ rake parallel:spec[4] 4 processes for 100 specs, ~ 25 specs per process ...
```

Or, all on one line:

```bash
$ PERCY_PARALLEL_NONCE=`date +%s` PERCY_PARALLEL_TOTAL=4 rake parallel:spec[4]
```

In this example, we use `date +%s` to generate a Unix timestamp to use as the parallel nonce. As long as different test runs never start at the exact same second, this will work nicely as an identifier for this build across all four parallel processes.

## How it works

Parallelism is a common way to speed up test suites by running multiple tests concurrently and then combining results at the end.

However, supporting parallel tests in a visual CI service is complex—unlike traditional CI services, different builds in Percy influence each other by design. Snapshots rendered in one build might become the new base for visual diffs in a later build. Because of this, we must ensure that all snapshots from your test suite are grouped correctly in a single Percy build.

Percy's API provides a simple mechanism to associate snapshots to the same Percy build, no matter if the snapshots are pushed from different processes or even different machines. Two params are needed: a "parallel nonce" (any unique identifier for the build) and the total number of build nodes. Having a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) that is shared across build nodes lets us link together snapshots created in different processes to the same Percy build. The client sends both of these with every API call to create a build.

On the server-side, we use a transaction to coordinate between all the parallel API calls and only create one build per nonce. If a pending build has already been created for the given nonce, the build is simply returned to the client.

To tell when a parallelized build is finished, we simply count the number of "finalize" API calls that have been received and only truly finalize the build when the count equals the total number of nodes we expect a response from. This lets us avoid many race conditions by design since we don't rely on when build nodes start or how long they run.

With this mechanism, the client-side logic remains very simple and all the complexities of transactionality and coordination between nodes happens in our service.

For more info, you can see the simple client-side logic for `parallel_nonce` and `parallel_total_shards` in the Ruby [percy/client/environment.rb](https://github.com/percy/percy-client/blob/master/lib/percy/client/environment.rb) file.
