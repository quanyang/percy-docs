# Percy for Storybook for React
#### [react-percy on GitHub <i class="fa fa-github" aria-hidden="true"></i>](https://github.com/percy/react-percy)

[![Package Status](https://img.shields.io/npm/v/@percy-io/react-percy-storybook.svg)](https://www.npmjs.com/package/@percy-io/react-percy-storybook)
[![Build Status](https://travis-ci.org/percy/react-percy.svg?branch=master)](https://travis-ci.org/percy/react-percy)

This adds [Percy](https://percy.io) visual testing and review to your [**React Storybook**](https://storybooks.js.org/).  

If you use React without Storybook see our [React](/docs/clients/javascript/react) page.

<div class="Alert Alert--warning">

**Beta release.** Percy for React Storybook is in beta. It may change in backwards-incompatible ways until v1.0.0 is released.

</div>

## Installation

[!INCLUDE /docs/clients/-do-setup-first]

1. Add as a dev dependency: `npm i --save-dev @percy-io/react-percy-storybook`
1. Open your **package.json**, and add a script: `"snapshot": "build-storybook && percy-storybook --widths=320,1280"`
1. Add the following line to the end of **.storybook/config.js**:

**Storybook v2:**

`if (typeof window === 'object') window.__storybook_stories__ = require('@kadira/storybook').getStorybook();`

**Storybook v3:**

`if (typeof window === 'object') window.__storybook_stories__ = require('@storybook/react').getStorybook();`


## Usage

After you've setup the `PERCY_TOKEN` and `PERCY_PROJECT` environment variables, run:

`npm run snapshot`

This will run Storybook's build-storybook command to create a static site from your storybook, and will upload your stories to Percy to generate screenshots from them.  You'll want to add `storybook-static` to your .gitignore file if you run this locally.

## Freezing time and dynamic data

As you start to introduce visual testing into your workflow, you might find that the passing of time or generated data from tools like [faker](https://github.com/marak/Faker.js/) can cause visual diffs.

It's fairly easy to stabilize these diffs. Tools like faker often allow you to provide a [seed](https://github.com/marak/Faker.js/#setting-a-randomness-seed) to ensure that the same data is generated each time faker is run. Libraries like [MockDate](https://github.com/boblauer/MockDate) allow you to override the current date, eliminating variations due to the screenshots being taking at a different date and time. If you use Math.random, you can seed it with [seedrandom](https://github.com/davidbau/seedrandom).

Percy provides an `inPercy` function that you can use in your Storybook's config.js if you'd prefer that these adjustments only have an effect when running in Percy's rendering environment.  Add the [@percy-io/in-percy](https://www.npmjs.com/package/@percy-io/in-percy) package if you'd like to use inPercy.

You can see an example of how this type of stabilization can be done in this  [storybook/config.js](https://github.com/percy/react-percy/blob/master/integration-tests/.storybook/config.js).


## Options

These options can be appended to the percy-storybook command in the script tag in your **package.json** file:

* **widths** - Specify multiple widths to screenshot your stories at.  eg. `--widths=320,1280`
* **minimum_height** - Specify the minimum height of story screenshots.  eg. `--minimum_height=300`
* **build_dir** - By default, percy-storybook looks for the static storybook in the `storybook-static` directory.  If you use build-storybook with a custom output directory, use build_dir instruct percy-storybook where to find it. eg. `--build_dir=my-static-storybook`
* **rtl** - Process all stories a second time in RTL.  eg. `--rtl`
* **rtl_regex** - Process stories with matching names a second time in RTL. eg. `--rtl_regex=unidirectional`
* **debug** - Provides additional debugging information. eg. `--debug`


## RTL Direction Support

Percy supports taking screenshots of your stories a second time in the RTL direction.

* To process all stories in the RTL direction, use the `--rtl` option.  To process only a subset in RTL, use the `--rtl_regex` option and provide a regex that will match the names of the stories you want to capture in RTL.
* Stories you have selected for RTL processing will be processed twice.  Once normally, and then a second time with `[RTL]` appended to their name, and with a `direction=rtl` url param provided.
* It's up to the stories to process the direction url param and respond appropriately.  You can see a basic example of how this can be done in our [Direction Demo test story](https://github.com/percy/react-percy/blob/master/integration-tests/stories/index.js).

## GitHub integration

Percy **automatically integrates with GitHub pull requests**, so you can do visual reviews with each PR's code review.

![](https://cloud.githubusercontent.com/assets/75300/13929974/13750b2c-ef5a-11e5-9a87-3ad3b335cc0d.png)

See our [GitHub integration](/docs/learn/github-integration) docs for more info.

## Troubleshooting

If you see an error message `Storybook object not found on window.` and followed all of the installation instructions, then please add the debug flag to the script command in your **package.json file**:

`"snapshot": "build-storybook && percy-storybook --width=320,1280 --debug"`

Run `npm run snapshot` again, and email the output to [hello@percy.io](mailto:hello@percy.io).


## Contributing

1. Fork it ( https://github.com/percy/react-percy/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new pull request

[Throw a ★ on it!](https://github.com/percy/react-percy) :)
