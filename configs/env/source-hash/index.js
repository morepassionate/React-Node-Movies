const gitHash = require('./git-hash');

const { env } = process;
const { SOURCE_HASH } = env;

let sourceHash = '';

/* eslint-disable no-console */
if (gitHash) {
  console.log('--- Source hash: using value from Git hash');
  sourceHash = gitHash;

} else if (SOURCE_HASH) {
  console.log(`--- Source hash: using value from process.env.SOURCE_HASH: ${SOURCE_HASH}`);
  sourceHash = SOURCE_HASH;

} else {
  console.log('--- Source hash: no value');
}
/* eslint-disable no-console */

if (typeof sourceHash.substring === 'function') {
  sourceHash = sourceHash.substring(0, 7);
}

module.exports = sourceHash;