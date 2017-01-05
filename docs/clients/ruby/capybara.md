# Percy::Capybara [<i class="fa fa-github" aria-hidden="true"></i>](https://github.com/percy/percy-capybara)

[![](https://travis-ci.org/percy/percy-capybara.svg?branch=master)](https://travis-ci.org/percy/percy-capybara)
[![](https://badge.fury.io/rb/percy-capybara.svg)](https://rubygems.org/gems/percy-capybara)

Percy::Capybara is a library for integrating Percy's visual regression testing into your existing [Capybara](https://github.com/jnicklas/capybara) feature tests in any Ruby web framework—including Rails, Sinatra, etc.

If you've written feature tests (or "UI tests", "acceptance tests", etc.), you know how hard it can be to get them right and to get your app in the correct UI state. Percy::Capybara lets you take all the time you've spent building your feature tests and expand them with screenshots and visual regression tests to cover all the visual changes in your app, even behind complex UI states.

The examples below assume you are using RSpec, but they could be easily adapted for other testing frameworks.

## Installation

[!INCLUDE /docs/clients/-do-setup-first]

Add this line to your application's Gemfile:

```ruby
gem 'percy-capybara'
```

And then execute:

```bash
$ bundle install
```

Or install it yourself with `gem install percy-capybara`.

## Setup

Test suites need to call two hooks:

* `Percy::Capybara.initialize_build` before running the test suite.
* `Percy::Capybara.finalize_build` after the test suite is finished, even if tests fail.

<div class="Alert Alert--warning">

**NOTE:** If your builds get stuck <i>"Receiving..."</i>, check this configuration first.

</div>

### RSpec

Add these setup lines to `spec_helper.rb`:

```ruby
RSpec.configure do |config|
  # ...

  config.before(:suite) { Percy::Capybara.initialize_build }
  config.after(:suite) { Percy::Capybara.finalize_build }
end
```

### Cucumber

Add these lines to `features/support/percy.rb`:

```ruby
Percy::Capybara.initialize_build
at_exit { Percy::Capybara.finalize_build }
```

### Other test frameworks (MiniTest, etc.)

For example, with MiniTest you can add this to your `test_helper.rb`:

```ruby
Percy::Capybara.initialize_build
MiniTest.after_run { Percy::Capybara.finalize_build }
```

### Non-Rails frameworks (Sinatra, etc.)

Without Rails autoloading, you will need to manually `require 'percy/capybara'` when using Percy.

## Usage

Now the fun part!

You can integrate with Percy by adding one line to your existing feature specs:

```ruby
Percy::Capybara.snapshot(page, name: 'homepage with dropdown')
```

For example:

```ruby
describe 'a feature', type: :feature, js: true do
  it 'shows the dropdown menu when clicked' do
    visit '/'
    first('.dropdown-toggle').click
    expect(page).to have_selector('#main-dropdown', visible: true)

    Percy::Capybara.snapshot(page, name: 'homepage with dropdown')
  end
end
```

**Done!** Now commit and push your branch to run your tests in your CI service, or create a GitHub PR.

<div class="Alert Alert--info">

Best practices for Capybara and writing feature specs are outside the scope of these docs. See the [Capybara docs](https://github.com/jnicklas/capybara#using-capybara-with-rspec) for more Capybara usage examples.

</div>

The `name: 'homepage with dropdown'` argument is not required, but it is helpful to identify the page by more than just its URL. If you are snapshotting a page multiple times with the same URL, `name` must be set. See _Identifying snapshots_ below.

### Responsive visual diffs

You can use Percy [responsive visual diffs](/docs/learn/responsive) to test pages at different CSS breakpoints.

In your `spec_helper.rb`, simply set the default widths for all snapshots:

```ruby
Percy.config.default_widths = [375, 1280]
```

With the above configuration, all snapshots will render at both mobile and desktop breakpoints by default.

You can also override widths per-snapshot:

```ruby
Percy::Capybara.snapshot(page, name: 'homepage', widths: [375, 1280])
```

### Local dev environments

You may want to enable Percy locally while getting set up. See [Local development](/docs/setup/local) setup for more info.

The `Percy::Capybara` client requires environment variables `PERCY_TOKEN` and `PERCY_PROJECT` to be set in order to run locally. You can temporarily set the environment vars to run locally:

```bash
$ export PERCY_TOKEN=aaabbbcccdddeeefff
$ export PERCY_PROJECT=my-org/my-repo
$ bundle exec rspec
```

Or in one line:

```bash
$ PERCY_TOKEN=aaabbbcccdddeeefff PERCY_PROJECT=my-org/my-repo bundle exec rspec
```

Careful though—if you run this in your local `master` branch, Percy cannot tell the difference between your local environment and your CI environment, so this will set the repo's `master` state in Percy. You can avoid this by simply checking out a different branch, or setting the `PERCY_BRANCH` environment variable.

If you wish to disable Percy from running in an environment, simply remove the environment variables or set `PERCY_ENABLE=0`.

### Identifying snapshots

Percy needs to be able to uniquely identify the same snapshot across builds to provide visual diffs.

To accomplish this, `Percy::Capybara` uses the current page URL as the name of the snapshot. We assume that your app has been built with stateful navigation and that the URL fully identifies the page state.

However, there are many cases where this is not enough—for example, populating test data in the page, or performing a UI interaction that doesn't change the URL (like clicking the dropdown in the example above).

To manually identify a snapshot, you can provide the `name` parameter:

```ruby
Percy::Capybara.snapshot(page, name: 'homepage (with dropdown clicked)')
```

The `name` param can be any string that makes sense to you to identify the page state, it should just be unique and remain the same across builds. It is **required** if you are snapshotting a page multiple times with the same URL.

## Troubleshooting

### Debug mode

Run with the `PERCY_DEBUG=1` environment variable to see what build resources and snapshots are being created for your build.

### WebMock/VCR users

If you use [VCR](https://github.com/vcr/vcr) to mock and record HTTP interactions, you need to allow connections to the Percy API:

```ruby
VCR.configure do |config|
  config.ignore_hosts 'percy.io'
end
```

If you use [WebMock](https://github.com/bblimke/webmock) to stub out HTTP connections, you need to allow connections to the Percy API:

```ruby
WebMock.disable_net_connect!(allow: 'percy.io')
```

If you still experience problems, and you are using a Webmock version older than 2.0.0, try adding `require: false` to the line in your Gemfile so that Webmock won't block the HTTP request in `initialize_build`:

```ruby
gem 'webmock', require: false
```

### Turn off debug assets

After upgrading to Sprockets 3, you may notice broken CSS in Percy builds. You likely have this option set in `test.rb`:

```ruby
config.assets.debug = true
```

This must be set to false in your `test.rb` file:

```ruby
config.assets.debug = false
```

There is no compelling reason to have debug assets permanently enabled in tests—debug assets disables concatination of asset files and will negatively affect your test performance and consistency. You must turn off debug assets in tests for Percy to work correctly.

### Cleanup locally compiled assets

Have you run `rake assets:precompile` locally to test assets? These compiled assets take precedence over others and can break Percy's asset discovery. You should run `rake assets:clobber` to clear out your `public/assets` directory.

## Other resources

*   [Percy::Capybara Reference](http://www.rubydoc.info/gems/percy-capybara/Percy/Capybara) on RubyDoc

### RailsConf 2016 talk

<iframe style="max-width: 1000px" width="100%" height="563" src="https://www.youtube-nocookie.com/embed/5h-JJ2wqiIw" frameborder="0" allowfullscreen></iframe>
<br>

## Changelog

*   [percy-capybara releases on GitHub](https://github.com/percy/percy-capybara/releases)

## Contributing

1.  Fork it ([https://github.com/percy/percy-capybara/fork](https://github.com/percy/percy-capybara/fork))
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create a new Pull Request

[Throw a ★ on it!](https://github.com/percy/percy-capybara) :)
