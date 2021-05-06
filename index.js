const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const [org, repo] = process.env.GITHUB_REPOSITORY.split("/");
const octokit = new Octokit({
    auth: core.getInput("github-token"),
});

console.log("logging org and repo", org, repo);

const graphqlCommitQuery = `
query($org: String!, $repo: String!) {
  repository(name: $repo, owner: $org) {
    ... on Repository {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 10) {
              edges {
                node {
                  ... on Commit {
                    message
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const exec = async () => {
    const result = await octokit.graphql(graphqlCommitQuery, {
        org,
        repo,
    });

    const commits = result.repository.defaultBranchRef.target;

    console.log("logging result", commits);
};

exec();
