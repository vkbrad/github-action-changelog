const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
console.log("logging token", core.getInput("githubToken"));
const octokit = new Octokit({
  auth: core.getInput("githubToken"),
  baseUrl: "https://api.github.com",
});

(async () => {
  const org = core.getInput("org");
  const repo = core.getInput("repo");

  const getChangelog = await octokit
    .request("GET /repos/{org}/{repo}/branches", {
      org,
      repo,
    })
    .catch((error) => {
      core.setFailed(error.message);
      console.log(error.message);
    });

  console.log("changelog", getChangelog);
})();
