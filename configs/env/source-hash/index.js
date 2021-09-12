const gitHash = require('./git-hash');

const { env } = process;

let sourceHash = (gitHash || env.SOURCE_HASH);

if (typeof sourceHash.substring === 'function') {
  sourceHash = sourceHash.substring(0, 7);
}

module.exports = sourceHash;