# Percy for Ruby: Best practices

## Waiting for elements with Capybara

Capybara is a powerful Ruby library for automating control of browsers.

Capybara has a [robust internal wait system](https://github.com/teamcapybara/capybara#asynchronous-javascript-ajax-and-friends) that can be used to efficiently wait for certain page elements to appear before continuing. You should never need to write a flaky `sleep` call with Capybara.

### With RSpec tests

```ruby
expect(page).to have_css('#new-project')
expect(page).to have_content('New Project')
```

This will efficiently wait for the `#new-project` element to exist.

### Without RSpec

You can use Capybara's generic `has_css?`/`has_content?`/`has_xpath?` methods to make sure that the page state is correct before continuing on. You probably will want to raise an exception to stop execution if the query for the element returns false.

```ruby
raise 'element missing!' unless page.has_css?('#new-project')
raise 'element missing!' unless page.has_content?('New Project')
```

### More info

* https://github.com/teamcapybara/capybara#querying
* https://github.com/teamcapybara/capybara#asynchronous-javascript-ajax-and-friends
