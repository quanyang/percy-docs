# Percy Anywhere

_Percy Anywhere_ is a simple wrapper that allows you to easily integrate Percy's visual tests with any `localhost` server or remote web app server.

Requirements:

* `percy-capybara` gem.
* `poltergeist` gem, which requires [PhantomJs](http://phantomjs.org/) to be installed.
* A directory of compiled asset files.
* A local or remote server running the app.

## Installation

[!INCLUDE /docs/clients/-do-setup-first]

### Without Bundler

You can simply install the required gems globally:

```bash
$ gem install percy-capybara
$ gem install poltergeist
```

### With Bundler

Add the following to your `Gemfile`:

```ruby
source 'https://rubygems.org'

gem 'poltergeist' # Requires PhantomJs to be installed.
gem 'percy-capybara'
```

Then, run:

```bash
$ bundle install
```

## Usage

Percy Anywhere does not require Rails or any test framework like RSpec. It simply uses the [Capybara](https://github.com/teamcapybara/capybara) library and a small Ruby script you write to control a web app.

### Example script

Let's create a file called `snapshots.rb`:

```ruby
require 'percy/capybara/anywhere'
ENV['PERCY_DEBUG'] = '1'  # Enable debugging output.

# Configuration.
server = 'http://localhost:8080'
assets_dir = File.expand_path('../dist/assets/', __FILE__)
assets_base_url = '/'

Percy::Capybara::Anywhere.run(server, assets_dir, assets_base_url) do |page|
  page.visit('/')
  Percy::Capybara.snapshot(page, name: 'homepage')
end
```

* `server` is a URL pointing to the local or remote host, such as `http://localhost:8080`.
* `assets_dir` is an absolute path to a directory of compiled static assets. These can by compiled by any asset pipeline tool, such as Webpack/Broccoli.js/etc.
* `assets_base_url` (optional): the path where your webserver hosts compiled assets, such as `/assets`. Default: `/`

Now, run:

```bash
$ ruby snapshots.rb
```

If you used the Bundler installation method, run:

```bash
$ bundle exec ruby snapshots.rb
```

**Done!** 🚀 Each time the script is run, Percy snapshots are taken and uploaded for rendering and processing. The script will output a link to the build to view any visual diffs.

### Interacting with elements

This script can be expanded with any complex behavior that interacts with the page. You can use all of the available [Capybara actions](https://github.com/teamcapybara/capybara#the-dsl) to interact with the page.

**Clicking on a button**

```ruby
  page.visit('/')
  page.click_button('New Project')
  Percy::Capybara.snapshot(page, name: 'homepage - new project modal')
```

**Clicking on an element by selector**

```
  page.visit('/about')
  page.find('#locations').click
  Percy::Capybara.snapshot(page, name: 'about page - locations')
```

<div class="Alert Alert--info">

See the [Capybara docs](https://github.com/teamcapybara/capybara) for many more interactions, best practices, and usage examples.

</div>

### Waiting for elements

See [Percy - Best practices](/docs/clients/ruby/best-practices#waiting-for-elements).


### Responsive visual diffs

You can use Percy [responsive visual diffs](/docs/learn/responsive) to test pages at different CSS breakpoints.

Simply set the default breakpoint configuration:

```ruby
Percy.config.default_widths = [375, 1280]
```

With the above configuration, all snapshots will render at both mobile and desktop breakpoints by default.

You can also override widths per-snapshot:

```ruby
Percy::Capybara.snapshot(page, name: 'homepage', widths: [375, 1280])
```

## Example app

A working example of this setup can be found here: https://github.com/percy/example-percy-anywhere

## Other resources

*   [Percy::Capybara::Anywhere source](https://github.com/percy/percy-capybara/blob/master/lib/percy/capybara/anywhere.rb)
*   [Percy::Capybara Reference](http://www.rubydoc.info/gems/percy-capybara/Percy/Capybara) on RubyDoc
