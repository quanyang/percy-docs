# Percy Tutorial for Ember

This 2 minute guide walks you through cloning the TodoMVC example app, changing the footer, and seeing the visual difference in Percy’s visual review tool.

Percy usually runs in [CI environments](/docs), but to keep this simple we’re going to configure it to run in your local environment.  

The tutorial assumes you have [ember](https://guides.emberjs.com/v2.10.0/getting-started/), [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), and [phantomjs](http://phantomjs.org/download.html) installed.


**Step 1:** Clone the TodoMVC example app:
```
git clone git@github.com:percy/example-ember.git
cd example-ember
```

**Step 2:** Sign in to Percy, create a new organization, skip the github integration, and create a new project.  You can name both the organization and project 'todo'.  

After you’ve created the project, you’ll be shown two environment variables.

**Step 3:** In the shell window you’re working in, export the 2 environment variables:
```
export PERCY_TOKEN=<your token here>
export PERCY_PROJECT=<your project here>
```

**Step 4:** Run `npm install` and `bower install`.

**Step 5:** Run `ember test`.  This will run the integration test, and send snapshots to Percy.io. You can view the snapshots on Percy now if you want, but there will be no comparisons yet.

![](/images/docs/tutorial-without-diffs.png)

**Step 6:** Use your text editor to edit `app/templates/application.hbs` and edit the footer to add a new paragraph on line 29: `<p>Now tested with Percy.io</p>`

**Step 7:** Commit the change.  `git add .; git commit -m "Added a line to the footer"`

**Step 8:** Run `ember test` again.  This will rerun the tests against your changes, and upload the new snapshot to Percy.  The new snapshots will be compared with the previous snapshots, creating a visual diff.

**Step 9:** Visit your project in Percy (if you're already on the page, push the refresh button) and you’ll see the visual comparison between the two test runs.  Click anywhere on the Build 2 row that says ‘2 visual diffs’.  You can see the original snapshot on the left, and new snapshot on the right.

Percy has highlighted what’s changed on the page.  You can click on the highlight to reveal the underlying screenshot.

**Finished!  :) :) :)** From here, you can try making your own changes to the app if you like.  If you do, re-run the tests, and then you'll be able to see your changes reflected in Percy.

![](/images/docs/tutorial-with-diffs.png)


This tutorial used TodoMVC with Percy already added. If you'd like to see how we added Percy, you can follow our 2 minute guide for [adding Percy to the TodoMVC example application](ember-adding-percy-to-todomvc).  
