# Ruby API client
#### [Percy::Client on GitHub <i class="fa fa-github" aria-hidden="true"></i>](https://github.com/percy/percy-client)

[![](https://travis-ci.org/percy/percy-client.svg?branch=master)](https://travis-ci.org/percy/percy-client)
[![](https://badge.fury.io/rb/percy-client.svg)](https://rubygems.org/gems/percy-client)

Ruby API client library for [Percy](https://percy.io).

<div class="Alert Alert--warning">

**NOTE:** This is the low-level Percy API client—you probably want to use the [Capybara client](/docs/clients/ruby/capybara) or the Ruby [command-line interface](/docs/clients/ruby/cli) instead.

</div>

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'percy-client'
```

And then execute:

```bash
$ bundle install
```

Or install it yourself with `gem install percy-client`.

## Authentication

```ruby
require 'percy'
Percy.config.access_token = '<PERCY WRITE-ONLY REPO TOKEN>'
```

Alternatively, you can set the `PERCY_TOKEN` environment variable. Each repository has it's own write-only token, which can be found in Percy _Settings_ page for the repo.

## Usage

There are four steps to working with Percy:

1.  Create a build.
2.  Create a snapshot for each HTML page, and indicate the resources that this page loads.
3.  Upload any missing resources.
4.  Finalize the build.

### Create a build

```ruby
build = Percy.create_build('repo/slug')
```

Or, to use the current Git repository name:

```ruby
build = Percy.create_build(Percy.client.config.repo)
```

### Create a snapshot

```ruby
html = File.read('./site/index.html')
css = File.read('./site/css/main.css')
resources = [
  Percy::Client::Resource.new('/index.html', is_root: true, content: html),
  Percy::Client::Resource.new('/css/main.css', content: css),
]
snapshot = Percy.create_snapshot(build['data']['id'], resources)
Percy.finalize_snapshot(snapshot['data']['id'])
```

The `is_root: true` param indicates the resource that is the main HTML resource of this snapshot, ie. the page that should be rendered. There must be exactly one root resource in a snapshot.

The API will automatically guess the resource mimetype based on the extension. If the URL doesn't have an extension, you can pass the `mimetype: 'text/html'` param to the `Percy::Client::Resource` object to explicitly set it.

Unlike calling `finalize_build` later, the call to `finalize_snapshot` is not strictly required. It is recommended, however, so that Percy can start processing the snapshot earlier and the build can be processed faster. If not called, Percy will wait to process snapshots until the build is finalized.

### Upload any missing resources

For performance reasons, resources are uploaded after the snapshot is created. Each snapshot API call returns a list of resource SHAs that have never been uploaded before and the client must followup and upload all the "missing" resources. This way, resources are only ever uploaded once and never re-uploaded unless they change.

The client uploads the "missing" resources:

```ruby
missing_resources = snapshot['data']['relationships']['missing-resources']['data']
missing_resources.each do |missing_resource|
  missing_resource_sha = missing_resource['id']
  resource = resources.find { |r| r.sha == missing_resource_sha }
  Percy.upload_resource(build['data']['id'], resource.content)
end
```

### Finalize the build

Once all missing resources from all snapshots are uploaded, the client can finalize the build.

```ruby
Percy.finalize_build(build['data']['id'])
```

Done! After this, the build will finishing processing, creating screenshots and visual diffs, and the build can be viewed in Percy.

## Environment variables

You can set [Percy environment variables](/docs/learn/env-vars) and they will override environment discovery.

## Changelog

*   [percy-client releases on GitHub](https://github.com/percy/percy-client/releases)

## Contributing

1.  Fork it ([https://github.com/percy/percy-client/fork](https://github.com/percy/percy-client/fork))
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create a new Pull Request
