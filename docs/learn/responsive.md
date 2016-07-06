# Responsive visual diffs

A powerful feature of Percy is visual regression testing for responsive designs. You provide a list of responsive breakpoint widths, we take care of the rest.

For example, here is a responsive visual diff of a button change on the same page rendered at different widths:

**/index.html @ 375px:**

![](/images/example-responsive-375.jpg)

**/index.html @ 1280px:**

![](/images/example-responsive-1280.jpg)

## Usage

Usage depends on the client library, see the **Usage** section of your specific client library.

## Limits

*   Maximum of 10 different widths per snapshot.
*   Each width must be between 120px and 1400px inclusive.

## Pricing

Each responsive width counts as as a separate visual diff in your subscription. For example, a snapshot of your homepage at 375px and 1280px simply counts as 2 visual diffs.

## How it works

Because Percy stores the original DOM snapshot and page assets, we simply render the same page at different widths by resizing the browser when generating page screenshots. This is handled entirely server-side and has **no effect on the speed of your tests** since all rendering and diffing takes place in Percy, like normal.

One downside to this approach is that we do not execute JavaScript by default while rendering pages, so any responsive changes that rely on JavaScript may not show. We have some ideas of how to handle this in the future, please [contact us](mailto:hello@percy.io) if you are interested in this feature.