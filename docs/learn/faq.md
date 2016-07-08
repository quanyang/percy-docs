# FAQ

#### What is continuous visual integration?

We believe that visual regression testing is only useful if it is done on every build, for every change, and fast enough to be integrated in your existing development workflow and CI services. We coined the phrase "continuous visual integration" to describe this more expansive view of visual testing and how Percy fits in the world of continuous integration.

#### How does visual regression testing work?

First, Percy renders a screenshot of the page and then visually compares it, pixel by pixel, to a previous screenshot. The output of this comparison creates a third image—this is the "visual diff" or "perceptual diff" that shows exactly what pixels changed between the images:

![](/images/example-pdiff.png)

#### So, I upload screenshots?

**Nope!** You might be surprised to learn that under the hood, Percy is not designed to accept screenshots, but instead captures DOM snapshots and page assets (CSS, images, etc.). This is very intentional—we want to keep your environment fast and handle all the complexities of deterministic rendering and visual diffs in our infrastructure. We also want to support visual testing for any web content, regardless of the language or framework it was created in.

#### My tests are already slow—isn't this going to make them slower?

**Nope!** Percy is designed to keep all the computationally expensive screenshot rendering and visual diffing completely out of your systems. By accepting DOM snapshots and assets alone, we can highly optimize Percy to have lightweight clients in numerous languages and environments with little performance impact on your side.

The first build may be slower than usual while assets are first uploaded, but then assets are never uploaded unless they change.

#### Do you support X language or X framework?

**Short answer: yes!** We have a set of [officially supported client libraries](/docs/) and are adding more. Our asset-centric design lets us support any web content no matter what language or framework it was created in. We want to encourage a developer ecosystem of tools that can easily integrate with Percy.

#### Do you support cross-browser testing?

**No.** You often only need one good, modern browser to get the main benefits of visual regression testing. Right now, all screenshots are rendered in a modern browser (Firefox 38 ESR). We are considering adding support for cross-browser testing in the future.

#### How do you handle dynamic page content?

**Short answer: we don't.** If you have page content that changes (auto-generated test data, timestamps, dynamic test users, etc.) you may see visual diffs in every build. You can simply ignore them if you know that they are correct, or take steps to reduce the dynamic data present in your feature tests. For example, you could use static fixture data or inject static content just for the relevant tests.

We are exploring features to help with this problem. Please [email us](mailto:hello@percy.io) if you're interested.

#### Do you support native mobile apps?

**No**, unless your app is built using HTML and CSS.

#### Do you require my repository to be on GitHub?

Right now we require GitHub for authentication, but the Percy client libraries support non-git environments. We are working on adding support for non-GitHub authentication schemes.

#### Do you require my code to be in Git?

**Nope!**

#### My diffs are very noisy, is this broken?

![](/images/noisy-pdiff.png)

This is one of the hard parts of perceptual diffs—the diff itself is pixel-by-pixel, so the diff may end up looking like noise if the content shifts by any amount. You still get the benefits of knowing when and where your app has changed, but it may require more manual analysis. In Percy you can simply click the diff to hide it and view the underlying screenshot to compare visually. Also see [Animations](/docs/learn/animations) for info on how Percy freezes animations.

#### Why is this such a hard problem?

I'm glad you asked! Check out our RailsConf 2016 talk:

<iframe style="max-width: 1000px" width="100%" height="563" src="https://www.youtube-nocookie.com/embed/5h-JJ2wqiIw" frameborder="0" allowfullscreen></iframe>
