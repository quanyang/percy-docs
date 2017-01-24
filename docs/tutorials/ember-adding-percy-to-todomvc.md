# Tutorial: Adding Percy to the TodoMVC example application

This tutorial uses the TodoMVC app from the [ember tutorial](ember), and walks through how Percy was added to it in the first place.

We checkout a branch to wind back the app to how it was before we added Percy to it, and walk through adding Percy.  

**Step 0:** We assume you've already done this as part of the [ember tutorial](ember), but if you haven't, clone the TodoMVC example app:
```
git clone git@github.com:percy/example-ember.git
cd example-ember
```

**Step 1:** Checkout the pre-percy branch: `git checkout pre-percy`

**Step 2:** Run `ember install ember-percy`.

**Step 3:** Add `import './percy/register-helpers';` to `tests/helpers/start-app.js`. This registers the Percy test helpers for all acceptance tests.

**Step 4:** Add `percySnapshot` to `tests/.jshintrc` in the `predef` section to avoid "percySnapshot is not defined" errors.

Percy is now ready to run snapshots.  Lets add two.

**Step 5:** Add `percySnapshot('Empty todo list');` to `tests/acceptance/user-can-add-todos-test.js` directly under the `visit('/');` line.

**Step 6:** Add `percySnapshot('Todo list with 2 todos');` to `tests/acceptance/user-can-add-todos-test.js` as the last line in the `andThen` block.

**Finished :) :) :)**  Your app now has everything it needs to take two snapshots during tests, and to send those snapshots to Percy.  If the environment variables have been setup as per the [ember tutorial](ember), then running `ember test` will send snapshots to Percy.
