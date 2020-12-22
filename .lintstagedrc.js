const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '**/*.{ts,tsx,js,jsx}': [
    (changedFiles) =>
      'yarn format-code ' +
      changedFiles.filter((file) => !cli.isPathIgnored(file)).join(' '),
    'yarn test:staged',
    'prettier --write',
  ],
};
