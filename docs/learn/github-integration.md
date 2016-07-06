# GitHub integration

Percy automatically integrates with GitHub Pull Requests.

If you run your tests in a {{#link-to "integrations.ci"}}supported CI service{{/link-to}}, you're done! Percy will automatically set commit statuses whenever your CI service runs a build.

## Approval workflow

If a build has visual diffs, it will be marked as a failure in the Pull Request. You can review and approve visual diffs in one click as part of your code review process.

{{mock-approval-flow}}

Approving a build is not required, you can still merge the Pull Request in GitHub. Approving a build in Percy simply sets the GitHub commit status to green/successful, so that your team can see that any visual changes were reviewed and approved.

You can use this workflow as a way to incorporate a simple visual review process into your current code review process.