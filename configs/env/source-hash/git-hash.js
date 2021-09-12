const childProcess = require('child_process');

let gitHash = '';

/* eslint-disable no-console */
try {
  gitHash = childProcess
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();

  console.log(`\n--- Git hash: succesfully parsed: ${gitHash}`);

} catch (error) {
  console.log(`\n--- Git hash: can't parse. Message: ${error.message}`);
}
/* eslint-disable no-console */

module.exports = gitHash;