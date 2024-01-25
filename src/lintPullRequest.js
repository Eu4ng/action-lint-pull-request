const commitlintConfig = require('conventional-changelog-conventionalcommits');
const conventionalCommitTypes = require('conventional-commit-types');
const conventionalCommitsParserOptions = require('conventional-commits-parser').sync;

const defaultTypes = Object.keys(conventionalCommitTypes.types);

module.exports = async function lintPullRequest(commit, types = defaultTypes) {
    const {parserOpts} = await commitlintConfig();
    const result = conventionalCommitsParserOptions(commit, parserOpts);

    function printAvailableTypes() {
        return `Available types:\n${types
            .map((type) => {
                let bullet = ` - ${type}`;

                if (types === defaultTypes) {
                    bullet += `: ${conventionalCommitTypes.types[type].description}`;
                }

                return bullet;
            })
            .join('\n')}`;
    }

    if (!result.type) {
        throw new Error(
            `No release type found in pull request title "${commit}". Add a prefix to indicate what kind of release this pull request corresponds to (see https://www.conventionalcommits.org/).\n\n${printAvailableTypes()}`
        );
    }

    if (!types.includes(result.type)) {
        throw new Error(
            `Unknown release type "${
                result.type
            }" found in pull request title "${commit}". \n\n${printAvailableTypes()}`
        );
    }
};