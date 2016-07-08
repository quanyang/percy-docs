Percy is designed to integrate with your tests and CI environment. To enable Percy, these environment variables must be configured in your CI service:

* `PERCY_TOKEN`: The Percy repo write-only API token. This is unique for each Percy repository.
* `PERCY_PROJECT`: The full repository slug, for example `my-org/repo-name`.
