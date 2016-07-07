Percy is designed to integrate with your tests while they run in CI.
<br>
**To enable Percy, these environment variables must be set in your CI environment**:

* `PERCY_TOKEN`: The Percy repo write-only API token. This is unique for each Percy repository.
* `PERCY_PROJECT`: The full repository slug, for example `my-org/repo-name`.
