const core = require('@actions/core');
const github = require('@actions/github');
const lintPullRequest = require('./src/lintPullRequest');

async function run()
{
    // Pull Request 제목 추출
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) { throw new Error("Pull Request 만 검사가 가능합니다"); }

    // Conventional Commits Config
    const config = process.env.INPUT_CONFIG;
    core.info(`config ${config}`);

    // Pull Request 제목이 Conventional Commits 규칙을 준수하는지 검사
    await lintPullRequest(pullRequest.title);
}

run();