# Percy for React Storybook
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

## Options

These options can be appended to the percy-storybook command in the script tag in your **package.json** file:

* **widths** - Specify multiple widths to screenshot your stories at.  eg. `--widths=320,1280`
* **build_dir** - By default, percy-storybook looks for the static storybook in the `storybook-static` directory.  If you use build-storybook with a custom output directory, use build_dir instruct percy-storybook where to find it. eg. `--build_dir=my-static-storybook`
* **debug** - Provides additional debugging information. eg. `--debug`

## GitHub integration

Percy **automatically integrates with GitHub PRs**, so you can do visual reviews with each PR's code review.

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
