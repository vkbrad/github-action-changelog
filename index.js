const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: core.getInput("githubToken"),
  baseUrl: "https://github.expedia.biz/api/v3",
});

(async () => {
  const path = core.getInput("path");
  const name = core.getInput("name");

  const getChangelog = await octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: path,
      repo: name,
      path: "CHANGELOG.md",
    })
    .catch((error) => {
      core.setFailed(error.message);
      console.log(error.message);
    });

  console.log("changelog", getChangelog);
})();
